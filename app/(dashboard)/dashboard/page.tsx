import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getMonthlyData, getAvailableMonths } from "@/actions/financialActions";
import { getUserInfo } from "@/actions/userActions";
import { FinancialDashboard } from "@/components/financial/financial-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

async function DashboardContent() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Obtener información del usuario incluyendo moneda preferida
  const userInfo = await getUserInfo();
  if (!userInfo) {
    redirect("/sign-in");
  }

  // Obtener el mes actual por defecto
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  // Cargar datos del mes actual y meses disponibles
  const [monthlyData, availableMonths] = await Promise.all([
    getMonthlyData(currentMonth),
    getAvailableMonths(),
  ]);

  return (
    <FinancialDashboard
      initialData={monthlyData}
      initialMonth={currentMonth}
      availableMonths={availableMonths}
      user={{
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        currency: userInfo.currency as
          | "CRC"
          | "USD"
          | "EUR"
          | "MXN"
          | "ARS"
          | "CLP"
          | "COP"
          | "PEN"
          | "BRL"
          | "GBP"
          | "CAD"
          | "JPY",
      }}
    />
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
