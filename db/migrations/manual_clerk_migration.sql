-- Script para limpiar la base de datos antes de la migración a Clerk

-- 1. Eliminar foreign keys que ya no existen o causan problemas
DO $$ 
BEGIN
    -- Eliminar foreign keys de incomes
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'incomes_user_id_users_id_fk') THEN
        ALTER TABLE incomes DROP CONSTRAINT incomes_user_id_users_id_fk;
    END IF;
    
    -- Eliminar foreign keys de fixed_expenses
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fixed_expenses_user_id_users_id_fk') THEN
        ALTER TABLE fixed_expenses DROP CONSTRAINT fixed_expenses_user_id_users_id_fk;
    END IF;
    
    -- Eliminar foreign keys de variable_expenses
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'variable_expenses_user_id_users_id_fk') THEN
        ALTER TABLE variable_expenses DROP CONSTRAINT variable_expenses_user_id_users_id_fk;
    END IF;
    
    -- Eliminar foreign keys de summaries
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'summaries_user_id_users_id_fk') THEN
        ALTER TABLE summaries DROP CONSTRAINT summaries_user_id_users_id_fk;
    END IF;
END $$;

-- 2. Eliminar índices antiguos si existen
DROP INDEX IF EXISTS fixed_expenses_user_mes_idx;
DROP INDEX IF EXISTS incomes_user_mes_idx;
DROP INDEX IF EXISTS summaries_user_mes_idx;
DROP INDEX IF EXISTS variable_expenses_user_mes_idx;

-- 3. Limpiar datos existentes (CUIDADO: Esto elimina todos los datos)
TRUNCATE TABLE incomes, fixed_expenses, variable_expenses, summaries CASCADE;

-- 4. Eliminar columnas user_id si existen
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'incomes' AND column_name = 'user_id') THEN
        ALTER TABLE incomes DROP COLUMN user_id;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'fixed_expenses' AND column_name = 'user_id') THEN
        ALTER TABLE fixed_expenses DROP COLUMN user_id;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'variable_expenses' AND column_name = 'user_id') THEN
        ALTER TABLE variable_expenses DROP COLUMN user_id;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'summaries' AND column_name = 'user_id') THEN
        ALTER TABLE summaries DROP COLUMN user_id;
    END IF;
END $$;

-- 5. Eliminar tabla users
DROP TABLE IF EXISTS users CASCADE;

-- 6. Crear tabla user_settings
CREATE TABLE IF NOT EXISTS user_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id text NOT NULL UNIQUE,
    currency text NOT NULL DEFAULT 'CRC',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 7. Agregar columna clerk_id a todas las tablas
ALTER TABLE incomes ADD COLUMN IF NOT EXISTS clerk_id text;
ALTER TABLE fixed_expenses ADD COLUMN IF NOT EXISTS clerk_id text;
ALTER TABLE variable_expenses ADD COLUMN IF NOT EXISTS clerk_id text;
ALTER TABLE summaries ADD COLUMN IF NOT EXISTS clerk_id text;

-- 8. Crear índices nuevos
CREATE INDEX IF NOT EXISTS incomes_user_mes_idx ON incomes (clerk_id, mes);
CREATE INDEX IF NOT EXISTS fixed_expenses_user_mes_idx ON fixed_expenses (clerk_id, mes);
CREATE INDEX IF NOT EXISTS variable_expenses_user_mes_idx ON variable_expenses (clerk_id, mes);
CREATE INDEX IF NOT EXISTS summaries_user_mes_idx ON summaries (clerk_id, mes);

-- Listo! Ahora puedes usar la aplicación con Clerk
