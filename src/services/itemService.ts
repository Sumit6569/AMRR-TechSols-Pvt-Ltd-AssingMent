
import { supabase } from "@/integrations/supabase/client";
import { Item } from "@/types/Item";

export const addItem = async (itemData: {
  name: string;
  type: string;
  description: string;
  cover_image: string;
  additional_images: string[];
}) => {
  const { data, error } = await supabase
    .from('items')
    .insert([{
      name: itemData.name,
      type: itemData.type,
      description: itemData.description,
      cover_image: itemData.cover_image,
      additional_images: itemData.additional_images
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding item:', error);
    throw error;
  }

  return data;
};

export const getItems = async (): Promise<Item[]> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching items:', error);
    throw error;
  }

  return data || [];
};
