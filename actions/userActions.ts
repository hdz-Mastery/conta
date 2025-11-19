"use server";

import { db } from "@/db/drizzle";
import { userSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import type { CurrencyCode } from "@/lib/utils/currencies";

// Actualizar moneda preferida del usuario
export async function updateUserCurrency(currency: CurrencyCode) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("No autenticado");
    }

    // Verificar si ya existe configuración para este usuario
    const [existingSetting] = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.clerkId, user.id))
      .limit(1);

    if (existingSetting) {
      // Actualizar configuración existente
      await db
        .update(userSettings)
        .set({ currency, updatedAt: new Date() })
        .where(eq(userSettings.clerkId, user.id));
    } else {
      // Crear nueva configuración
      await db
        .insert(userSettings)
        .values({ clerkId: user.id, currency });
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating currency:", error);
    throw error;
  }
}

// Obtener información del usuario incluyendo moneda
export async function getUserInfo() {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }

    // Buscar configuración del usuario
    const [settings] = await db
      .select()
      .from(userSettings)
      .where(eq(userSettings.clerkId, user.id))
      .limit(1);

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null,
      currency: settings?.currency || "CRC",
    };
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
}
