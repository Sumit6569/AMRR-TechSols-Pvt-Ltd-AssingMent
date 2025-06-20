
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Item } from "@/types/Item";
import { useToast } from "@/hooks/use-toast";

interface ItemModalProps {
  item: Item;
  onClose: () => void;
}

const ItemModal = ({ item, onClose }: ItemModalProps) => {
  const { toast } = useToast();

  const handleEnquire = () => {
    toast({
      title: "Enquiry Sent!",
      description: `Your enquiry for "${item.name}" has been sent successfully.`,
    });
  };

  // Combine cover image with additional images for carousel
  const allImages = [item.cover_image, ...item.additional_images];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-6">
            {/* Image Carousel */}
            <div className="mb-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${item.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {allImages.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>

            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {item.type}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    Added on {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  <Button 
                    onClick={handleEnquire}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Enquire
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemModal;
