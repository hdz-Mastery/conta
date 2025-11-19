"use server";

import { currentUser } from "@clerk/nextjs/server";

// Obtener usuario actual desde Clerk
export async function getCurrentUser() {
  const user = await currentUser();
  
  if (!user) return null;

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || "",
    name: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : null,
  };
}
