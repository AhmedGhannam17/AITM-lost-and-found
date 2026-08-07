-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create items table
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    description TEXT NOT NULL,

    item_type TEXT NOT NULL CHECK (item_type IN ('Lost', 'Found')),

    category TEXT NOT NULL,

    campus_area TEXT NOT NULL,
    specific_location TEXT NOT NULL,

    event_date DATE NOT NULL,

    status TEXT NOT NULL DEFAULT 'Open'
        CHECK (status IN ('Open', 'Claimed')),

    image_url TEXT,

    contact_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();