
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Redirects map for known missing routes
    const redirects: Record<string, string> = {
      "/documents/invoices": "/invoices",
      "/services/history": "/history",
      "/profile/vehicles": "/vehicles",
      "/vehicles/add": "/vehicles"
    };
    
    // Check if the current path is in our redirects map
    if (location.pathname in redirects) {
      navigate(redirects[location.pathname]);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
