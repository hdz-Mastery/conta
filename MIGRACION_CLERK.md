# Migración a Clerk - Cambios Realizados

## 🎯 Resumen
Se ha migrado completamente el sistema de autenticación de la aplicación desde autenticación personalizada (con tabla de usuarios) a **Clerk**, permitiendo inicio de sesión con Google y email.

## 📋 Archivos Eliminados

### Componentes de Auth
- ✅ `/components/auth/login-form.tsx`
- ✅ `/components/auth/register-form.tsx`
- ✅ `/components/auth/forgot-password-form.tsx`
- ✅ `/components/auth/reset-password-form.tsx`

### Store y Sesiones
- ✅ `/store/authStore.ts` (Zustand store de auth)
- ✅ `/lib/utils/session.ts` (JWT sessions)
- ✅ `/lib/email.ts` (Emails de recuperación)

## 📝 Archivos Modificados

### Actions
- ✅ **`/actions/authActions.ts`** - Reescrito para usar `currentUser()` de Clerk
- ✅ **`/actions/userActions.ts`** - Actualizado para manejar configuración de usuario con Clerk ID
- ✅ **`/actions/financialActions.ts`** - Todas las funciones ahora usan `currentUser()` en lugar de sesiones JWT

### Database Schema
- ✅ **`/db/schema.ts`** - Cambios importantes:
  - Eliminada tabla `users`
  - Nueva tabla `userSettings` con campo `clerkId`
  - Todas las tablas (`incomes`, `fixedExpenses`, `variableExpenses`, `summaries`) ahora usan `clerkId` (text) en lugar de `userId` (uuid)
  - Índices actualizados para usar `clerkId`

### Layouts y Middleware
- ✅ **`/app/(dashboard)/layout.tsx`** - Usa `currentUser()` y redirige a `/sign-in`
- ✅ **`proxy.ts` → `middleware.ts`** - Renombrado y actualizado con rutas públicas `/sign-in(.*)` y `/sign-up(.*)`

### Types y Validaciones
- ✅ **`/types/index.ts`** - Eliminado `User`, `NewUser`, `SessionPayload`. Agregado `UserSettings`
- ✅ **`/lib/validations/schemas.ts`** - Eliminados `registerSchema` y `loginSchema`

## 🗄️ Base de Datos - Migración Pendiente

Se generó una nueva migración: **`0003_bumpy_dreaming_celestial.sql`**

### Lo que hace esta migración:
1. ❌ **Elimina la tabla `users`** (y todas sus foreign keys en cascada)
2. ✅ Crea la tabla `user_settings` con `clerkId` único
3. ✅ Agrega columna `clerkId` (text) a todas las tablas
4. ✅ Recrea los índices usando `clerkId`
5. ❌ **Elimina las columnas `user_id`** de todas las tablas

⚠️ **IMPORTANTE: Esta migración eliminará todos los usuarios existentes y sus datos relacionados**

### Para aplicar la migración:

```bash
# Revisar la migración
cat db/migrations/0003_bumpy_dreaming_celestial.sql

# Aplicar (elimina datos existentes)
pnpm drizzle-kit push
```

## 🔐 Configuración de Clerk

Asegúrate de tener las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

## 🚀 Flujo de Autenticación Actual

1. **Login/Registro**: Manejado completamente por Clerk
   - Ruta: `/sign-in`
   - OAuth con Google habilitado
   - Email/Password habilitado

2. **Protección de rutas**: Manejada por `middleware.ts`
   - Rutas públicas: `/sign-in`, `/sign-up`
   - Resto: requiere autenticación

3. **Obtener usuario**: 
   ```typescript
   import { currentUser } from "@clerk/nextjs/server";
   const user = await currentUser();
   ```

4. **Identificador de usuario**: `user.id` (Clerk ID) en lugar de UUID

## ✨ Beneficios

- ✅ Autenticación con Google
- ✅ Autenticación con Email/Password
- ✅ UI de login profesional (Clerk)
- ✅ Gestión de sesiones automática
- ✅ Seguridad mejorada
- ✅ Menos código que mantener
- ✅ Recuperación de contraseña automática

## 📌 Próximos Pasos

1. **Aplicar migración de base de datos** (elimina datos actuales)
2. **Configurar página de sign-in**: Ya está en `/app/sign-in/[[...sign-in]]/page.tsx`
3. **Probar el flujo completo** de login y funcionalidad financiera
4. **Opcional**: Agregar sign-up page si lo necesitas

## 🔄 Revertir Cambios

Si necesitas volver atrás, los cambios están en Git. Puedes hacer:
```bash
git log  # ver commits
git revert <commit-hash>  # revertir
```
