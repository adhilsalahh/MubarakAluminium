import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name: string;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  price_range: string;
  image_url: string;
  features: string[];
  specifications: Record<string, string>;
  gallery_images: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface KitchenDesign {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  dimensions: string;
  image_url: string;
  gallery_images: string[];
  advantages: string[];
  sort_order: number;
  created_at: string;
}

export const TABLES = {
  CATEGORIES: 'aluminum_categories',
  PRODUCTS: 'aluminum_products',
  KITCHEN_DESIGNS: 'aluminum_kitchen_designs',
} as const;
