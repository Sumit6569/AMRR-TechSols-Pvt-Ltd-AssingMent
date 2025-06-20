
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Gear Hub</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/view-items">
              <Button 
                variant={isActive("/view-items") ? "default" : "ghost"}
                className={isActive("/view-items") ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                View Items
              </Button>
            </Link>
            <Link to="/add-items">
              <Button 
                variant={isActive("/add-items") ? "default" : "ghost"}
                className={isActive("/add-items") ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Add Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
