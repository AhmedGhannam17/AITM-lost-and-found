export type ItemType = "Lost" | "Found";

export type ItemStatus = "Open" | "Claimed";

export interface Item {
  id: string;
  title: string;
  description: string;
  item_type: ItemType;
  category: string;
  campus_area: string;
  specific_location: string;
  event_date: string;
  status: ItemStatus;
  image_url: string | null;
  contact_name: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export interface NewItemPayload {
  title: string;
  description: string;
  item_type: ItemType;
  category: string;
  campus_area: string;
  specific_location: string;
  event_date: string;
  status: ItemStatus;
  image_url: string | null;
  contact_name: string;
  contact_phone: string;
}
