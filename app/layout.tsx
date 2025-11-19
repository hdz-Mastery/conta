import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import {
  ClerkProvider

} from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FinanzApp | Gestión de Finanzas Personales",
  description:
    "Controla tus ingresos, gastos, ahorros y deudas de manera inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="es" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          {children}
          <Toaster position="top-center" richColors />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
