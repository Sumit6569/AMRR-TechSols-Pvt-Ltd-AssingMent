
import { Item } from "@/types/Item";

const STORAGE_KEY = "gear-hub-items";

export const getItems = (): Item[] => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : getDefaultItems();
  } catch (error) {
    console.error("Error getting items from storage:", error);
    return getDefaultItems();
  }
};

export const saveItems = (items: Item[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving items to storage:", error);
  }
};

export const addItem = (item: Omit<Item, "id" | "created_at">): Item => {
  const newItem: Item = {
    ...item,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const items = getItems();
  const updatedItems = [newItem, ...items];
  saveItems(updatedItems);
  
  return newItem;
};

const getDefaultItems = (): Item[] => [
  {
    id: "1",
    name: "Professional Running Shoes",
    type: "Shoes",
    description: "High-performance running shoes designed for comfort and durability. Perfect for long distance running and daily workouts.",
    cover_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    additional_images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop"
    ],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2", 
    name: "Vintage Denim Jacket",
    type: "Shirt",
    description: "Classic vintage denim jacket with premium quality fabric. Perfect for casual outings and street style fashion.",
    cover_image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=300&fit=crop",
    additional_images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    ],
    created_at: "2024-01-14T15:30:00Z",
    updated_at: "2024-01-14T15:30:00Z"
  },
  {
    id: "3",
    name: "Professional Tennis Racket",
    type: "Sports Gear", 
    description: "High-end tennis racket used by professionals. Lightweight carbon fiber construction with perfect balance and control.",
    cover_image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    additional_images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    ],
    created_at: "2024-01-13T09:45:00Z",
    updated_at: "2024-01-13T09:45:00Z"
  }
];
