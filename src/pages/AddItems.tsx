
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { addItem } from "@/services/itemService";
import { ITEM_TYPES } from "@/types/Item";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const AddItems = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    cover_image: "",
    additional_images: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (field: "cover_image" | "additional_images", files: FileList | null) => {
    if (!files) return;

    // For demo purposes, we'll use placeholder URLs
    // In a real app, you'd upload to a service like Cloudinary or AWS S3
    const placeholderImages = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    if (field === "cover_image") {
      setFormData(prev => ({
        ...prev,
        cover_image: randomImage
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        additional_images: [...prev.additional_images, randomImage]
      }));
    }

    toast({
      title: "Image uploaded!",
      description: `Your ${field === "cover_image" ? "cover" : "additional"} image has been uploaded successfully.`,
    });
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description || !formData.cover_image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload a cover image.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addItem(formData);
      
      toast({
        title: "Item successfully added!",
        description: "Your item has been added to the collection.",
      });

      // Reset form
      setFormData({
        name: "",
        type: "",
        description: "",
        cover_image: "",
        additional_images: [],
      });

      // Navigate to view items after a short delay
      setTimeout(() => {
        navigate("/view-items");
      }, 1500);

    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "There was an error adding your item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
            <p className="text-gray-600">Share your gear with the community</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter item name"
                    required
                  />
                </div>

                {/* Item Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Item Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ITEM_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Item Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Item Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your item in detail"
                    rows={4}
                    required
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    {formData.cover_image ? (
                      <div className="space-y-4">
                        <img
                          src={formData.cover_image}
                          alt="Cover preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData(prev => ({ ...prev, cover_image: "" }))}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <Button type="button" variant="outline" asChild>
                            <label htmlFor="cover-upload" className="cursor-pointer">
                              Upload Cover Image
                            </label>
                          </Button>
                          <input
                            id="cover-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload("cover_image", e.target.files)}
                          />
                        </div>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Images */}
                <div className="space-y-2">
                  <Label htmlFor="additionalImages">Additional Images</Label>
                  <div className="space-y-4">
                    {formData.additional_images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {formData.additional_images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Additional ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6"
                              onClick={() => removeAdditionalImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <Button type="button" variant="outline" asChild>
                        <label htmlFor="additional-upload" className="cursor-pointer">
                          Add More Images
                        </label>
                      </Button>
                      <input
                        id="additional-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload("additional_images", e.target.files)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Item..." : "Add Item"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
