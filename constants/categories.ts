export const CATEGORIES = [
  "Electronics",
  "Clothing & Accessories",
  "Books & Stationery",
  "Bags & Wallets",
  "Keys & Cards",
  "Jewellery & Watches",
  "Sports Equipment",
  "Documents & IDs",
  "Food & Drinks",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
