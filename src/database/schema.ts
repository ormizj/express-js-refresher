const schema = `
  CREATE TABLE IF NOT EXISTS customers (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT UNIQUE,
    phone       TEXT,
    address     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS technicians (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT UNIQUE,
    phone       TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id             SERIAL PRIMARY KEY,
    customer_id    INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    technician_id  INTEGER REFERENCES technicians(id) ON DELETE SET NULL,
    title          TEXT NOT NULL,
    description    TEXT,
    status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
    scheduled_at   TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
  );
    
  CREATE INDEX IF NOT EXISTS idx_jobs_customer_id   ON jobs (customer_id);
  CREATE INDEX IF NOT EXISTS idx_jobs_technician_id ON jobs (technician_id);
  CREATE INDEX IF NOT EXISTS idx_jobs_status        ON jobs (status);
  
  ALTER TABLE customers
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN address SET NOT NULL,
    ALTER COLUMN phone SET NOT NULL;
    
  ALTER TABLE technicians
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN phone SET NOT NULL;
    
  CREATE UNIQUE INDEX IF NOT EXISTS customers_phone_key ON customers (phone);
  CREATE UNIQUE INDEX IF NOT EXISTS customers_email_key ON customers (email);
  
  CREATE UNIQUE INDEX IF NOT EXISTS technicians_phone_key ON technicians (phone);
  CREATE UNIQUE INDEX IF NOT EXISTS technicians_email_key ON technicians (email);
  
  ALTER TABLE jobs
    DROP COLUMN scheduled_at,
    ADD COLUMN start_time TIMESTAMPTZ NOT NULL,
    ADD COLUMN end_time TIMESTAMPTZ NOT NULL;
`;

export default schema;