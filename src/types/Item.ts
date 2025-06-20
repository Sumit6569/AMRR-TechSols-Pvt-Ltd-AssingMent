
export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  cover_image: string;
  additional_images: string[];
  created_at: string;
  updated_at: string;
}

export const ITEM_TYPES = [
  "Shirt",
  "Pant", 
  "Shoes",
  "Sports Gear",
  "Electronics",
  "Accessories",
  "Other"
];
