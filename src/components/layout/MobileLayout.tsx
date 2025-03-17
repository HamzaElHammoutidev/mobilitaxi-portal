
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Car, FileText, MapPin, Menu, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false,
  onBack
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };
  
  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          {showBackButton ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="text-gray-800 hover:bg-gray-100 mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
          ) : null}
          <h1 className="text-xl font-bold text-gray-800">
            {title || 'Centre du Taxi'}
          </h1>
        </div>
        
        <Menu className="text-gray-800" />
      </header>
      
      {/* Main content */}
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <Link to="/" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname === '/' ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname === '/' ? "bg-taxi-yellow/20" : ""
          )}>
            <Home size={20} className={location.pathname === '/' ? "text-taxi-yellow" : ""} />
          </div>
          <span>Accueil</span>
        </Link>
        
        <Link to="/locations/map" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname === '/locations/map' ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname === '/locations/map' ? "bg-taxi-yellow/20" : ""
          )}>
            <MapPin size={20} className={location.pathname === '/locations/map' ? "text-taxi-yellow" : ""} />
          </div>
          <span>Carte</span>
        </Link>
        
        <Link to="/services" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/services') ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname.includes('/services') ? "bg-taxi-yellow/20" : ""
          )}>
            <FileText size={20} className={location.pathname.includes('/services') ? "text-taxi-yellow" : ""} />
          </div>
          <span>Services</span>
        </Link>
        
        <Link to="/profile" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/profile') ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname.includes('/profile') ? "bg-taxi-yellow/20" : ""
          )}>
            <Settings size={20} className={location.pathname.includes('/profile') ? "text-taxi-yellow" : ""} />
          </div>
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout;
