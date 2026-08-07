import { supabase } from "@/lib/supabase";
import type { NewItemPayload } from "@/types/item";

const STORAGE_BUCKET = "item-images";

/**
 * Uploads an image file to Supabase Storage and returns the public URL.
 * Throws on upload error.
 */
export async function uploadItemImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * Inserts a new item row into the items table.
 * Returns the created item id.
 */
export async function insertItem(payload: NewItemPayload): Promise<string> {
  const { data, error } = await supabase
    .from("items")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw new Error(`Failed to save item: ${error.message}`);

  return data.id as string;
}
