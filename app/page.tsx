import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Sparkles,
  PieChart,
  Wallet,
  CheckCircle2,
  Moon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FinanzApp Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              FinanzApp
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Comenzar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-10 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Sparkles className="h-4 w-4" />
              Gestión financiera inteligente
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "100ms" }}
            >
              Toma el control de
              <span className="block mt-2 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                tus finanzas personales
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "200ms" }}
            >
              Gestiona ingresos, gastos y ahorro en tiempo real. Soporte para{" "}
              <span className="font-semibold text-foreground">
                12 monedas internacionales
              </span>
              . Dashboard intuitivo con análisis automático de tu salud
              financiera.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:scale-105 transition-all"
                >
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 text-base hover:bg-primary/5"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Ver Demo en Vivo
                </Button>
              </Link>
            </div>

            <div
              className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground animate-in fade-in duration-700"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Sin tarjeta</span>
              </div>
              <div className="flex items-center gap-2  sm:flex">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Setup en 2 minutos</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div
            className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000"
            style={{ animationDelay: "500ms" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-primary/10 to-transparent blur-3xl -z-10" />
            <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-2 shadow-2xl">
              <Image
                src="/images/control.png"
                alt="Dashboard de Control Financiero"
                width={1920}
                height={1080}
                className="rounded-xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Todo lo que necesitas para
              <span className="block text-primary">gestionar tu dinero</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para simplificar tu vida
              financiera
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            <FeatureCard
              icon={<Globe className="h-10 w-10" />}
              title="12 Monedas Soportadas"
              description="CRC, USD, EUR, MXN, ARS, CLP, COP, PEN, BRL, GBP, CAD, JPY con formato automático"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10" />}
              title="Control Total"
              description="Gestiona ingresos, gastos fijos y variables en tiempo real con edición inline"
              color="from-primary to-purple-500"
            />
            <FeatureCard
              icon={<PieChart className="h-10 w-10" />}
              title="Análisis Inteligente"
              description="Métricas automáticas, porcentajes y recomendaciones personalizadas"
              color="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Dashboard Interactivo"
              description="Visualiza tu salud financiera con gráficos de barras y estado en tiempo real"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="Rápido y Fluido"
              description="Interfaz animada estilo anime con transiciones suaves y responsive design"
              color="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<Moon className="h-10 w-10" />}
              title="Dark Mode"
              description="Cambia entre modo claro y oscuro con un clic, diseñado para comodidad"
              color="from-slate-500 to-slate-700"
            />
          </div>

          {/* Analysis Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
                <BarChart3 className="h-4 w-4" />
                Análisis Avanzado
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Insights automáticos de tu salud financiera
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Distribución de Gastos
                    </p>
                    <p className="text-sm">
                      Visualiza cómo se dividen tus gastos fijos y variables con
                      barras de progreso animadas
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Estado Financiero
                    </p>
                    <p className="text-sm">
                      Clasificación automática: Excelente, Saludable o Crítico
                      basado en tu balance
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Recomendaciones Inteligentes
                    </p>
                    <p className="text-sm">
                      Consejos personalizados para mejorar tu capacidad de
                      ahorro y reducir gastos
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Métricas Clave
                    </p>
                    <p className="text-sm">
                      Porcentaje de ahorro, tasa de gasto y eficiencia
                      financiera calculados automáticamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/20 to-emerald-500/20 blur-3xl" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur p-2 shadow-xl">
                  <Image
                    src="/images/analisis.png"
                    alt="Panel de Análisis Financiero"
                    width={800}
                    height={600}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comienza en 3 simples pasos
            </h2>
            <p className="text-lg text-muted-foreground">
              Empieza a controlar tus finanzas en menos de 2 minutos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Crea tu cuenta"
              description="Regístrate gratis sin tarjeta de crédito. Solo email y contraseña."
            />
            <StepCard
              number="02"
              title="Elige tu moneda"
              description="Selecciona entre 12 monedas internacionales con formato automático."
            />
            <StepCard
              number="03"
              title="Empieza a registrar"
              description="Agrega tus ingresos y gastos. El análisis se actualiza en tiempo real."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50" />
          <div className="relative bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-3xl p-8 md:p-16 text-center space-y-6 backdrop-blur">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              100% Gratis, Siempre
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para transformar tu vida financiera?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Únete a usuarios alrededor del mundo que ya están tomando el
              control de sus finanzas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-base shadow-2xl shadow-primary/40 hover:shadow-primary/50 hover:scale-105 transition-all"
                >
                  Comenzar Gratis Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 text-base"
                >
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center gap-12 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Monedas</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">0€</p>
                <p className="text-sm text-muted-foreground">Costo</p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div className="hidden sm:block">
                <p className="text-3xl font-bold text-primary">2min</p>
                <p className="text-sm text-muted-foreground">Setup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.png"
                  alt="FinanzApp Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">FinanzApp</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Tu compañero inteligente para la gestión financiera personal.
                Controla tus finanzas desde cualquier lugar del mundo.
              </p>
              <div className="flex gap-4">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <Shield className="h-5 w-5 text-muted-foreground" />
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Características
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-foreground transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-foreground transition-colors"
                  >
                    Seguridad
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 FinanzApp. Todos los derechos reservados.</p>
            <p className="flex items-center gap-2">
              Hecho con <span className="text-red-500">♥</span> para el mundo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur group">
      <div
        className={`mb-4 h-12 w-12 rounded-xl bg-linear-to-br ${color} p-2.5 text-white shadow-lg group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all group">
      <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 mt-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
