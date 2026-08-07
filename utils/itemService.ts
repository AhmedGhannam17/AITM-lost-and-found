import { supabase } from "@/lib/supabase";
import type { Item, NewItemPayload } from "@/types/item";

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

/**
 * Fetches all Open items, newest first.
 */
export async function fetchAllOpenItems(): Promise<Item[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("status", "Open")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch items: ${error.message}`);

  return (data ?? []) as Item[];
}

/**
 * Fetches a single item by its id.
 * Returns null if not found.
 */
export async function fetchItemById(id: string): Promise<Item | null> {
  // Validate UUID before querying Supabase
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {
    return null;
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch item: ${error.message}`);
  }

  return data as Item;
}

/**
 * Updates an existing item row in the items table.
 */
export async function updateItem(
  id: string,
  payload: Partial<NewItemPayload>
): Promise<void> {
  const { error } = await supabase
    .from("items")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`Failed to update item: ${error.message}`);
}

/**
 * Deletes an item row from the items table by id.
 */
export async function deleteItem(id: string): Promise<void> {
  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Failed to delete item: ${error.message}`);
}

/**
 * Updates an item's status to "Claimed".
 */
export async function markItemClaimed(id: string): Promise<void> {
  const { error } = await supabase
    .from("items")
    .update({
      status: "Claimed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`Failed to mark item as claimed: ${error.message}`);
}

