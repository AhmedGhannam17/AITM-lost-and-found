export const CAMPUS_AREAS = [
  "Main Building",
  "Library",
  "Cafeteria",
  "Auditorium",
  "Labs Block",
  "Sports Complex",
  "Parking Area",
  "Garden / Outdoor",
  "Hostel",
  "Admin Block",
  "Other",
] as const;

export type CampusArea = (typeof CAMPUS_AREAS)[number];
