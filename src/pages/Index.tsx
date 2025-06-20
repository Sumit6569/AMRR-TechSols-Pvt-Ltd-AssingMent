
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Gear Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your ultimate destination for managing and discovering amazing gear. 
            Add your items and explore our growing collection.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">View Items</CardTitle>
              <CardDescription className="text-gray-600">
                Browse through all the amazing gear in our collection
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/view-items">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                  Explore Items
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Add Items</CardTitle>
              <CardDescription className="text-gray-600">
                Share your gear with the community by adding new items
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/add-items">
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200">
                  Add New Item
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
