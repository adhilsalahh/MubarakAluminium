/*
  # Products and Categories Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (Doors, Windows, Kitchen)
      - `slug` (text) - URL-friendly identifier
      - `description` (text) - Category description
      - `icon_name` (text) - Lucide icon name
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text) - Product name
      - `slug` (text) - URL-friendly identifier
      - `description` (text) - Short description
      - `long_description` (text) - Detailed description
      - `price_range` (text) - Price information
      - `image_url` (text) - Main product image
      - `features` (jsonb) - Array of features
      - `specifications` (jsonb) - Product specifications
      - `gallery_images` (jsonb) - Array of gallery images
      - `is_featured` (boolean) - Featured product flag
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `kitchen_designs`
      - `id` (uuid, primary key)
      - `name` (text) - Design name (L-Shape, U-Shape, etc)
      - `slug` (text) - URL-friendly identifier
      - `description` (text) - Design description
      - `features` (jsonb) - Array of features
      - `dimensions` (text) - Typical dimensions
      - `image_url` (text) - Design layout image
      - `gallery_images` (jsonb) - Array of example images
      - `advantages` (jsonb) - Array of advantages
      - `sort_order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (products are public)
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  price_range text DEFAULT '',
  image_url text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Kitchen designs table
CREATE TABLE IF NOT EXISTS kitchen_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  dimensions text DEFAULT '',
  image_url text NOT NULL,
  gallery_images jsonb DEFAULT '[]'::jsonb,
  advantages jsonb DEFAULT '[]'::jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE kitchen_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view kitchen designs"
  ON kitchen_designs FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_kitchen_designs_slug ON kitchen_designs(slug);
