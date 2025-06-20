
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import ItemModal from "@/components/ItemModal";
import { Item } from "@/types/Item";
import { getItems } from "@/services/itemService";
import { useToast } from "@/hooks/use-toast";

const ViewItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
        toast({
          title: "Error",
          description: "Failed to load items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [toast]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Items</h1>
          <p className="text-gray-600">Discover amazing gear from our collection</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found. Start by adding some gear!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
                onClick={() => handleItemClick(item)}
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.cover_image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {item.name}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {item.type}
                  </Badge>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ViewItems;
