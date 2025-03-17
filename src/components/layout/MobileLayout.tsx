
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Car, FileText, MapPin, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  const { user } = useAuth();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };
  
  return (
    <div className="app-container flex flex-col h-screen bg-taxi-gray">
      {/* Header */}
      <header className="bg-taxi-blue text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          {showBackButton ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="text-white hover:bg-taxi-blue/80 mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
          ) : (
            <Menu className="mr-2" />
          )}
          <h1 className="text-xl font-semibold">
            {title || 'Centre du Taxi'}
          </h1>
        </div>
        
        {user && (
          <div className="flex items-center">
            <div className={cn(
              "status-badge mr-2",
              user.status === 'pending' ? "status-pending" : "status-validated"
            )}>
              {user.status === 'pending' ? 'En attente' : 'Validé'}
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <nav className="bottom-nav z-10">
        <Link to="/" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname === '/' ? "text-taxi-blue font-medium" : "text-gray-500"
        )}>
          <Home size={24} />
          <span>Accueil</span>
        </Link>
        
        <Link to="/appointments" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/appointments') ? "text-taxi-blue font-medium" : "text-gray-500"
        )}>
          <Calendar size={24} />
          <span>Rendez-vous</span>
        </Link>
        
        <Link to="/vehicles" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/vehicles') ? "text-taxi-blue font-medium" : "text-gray-500"
        )}>
          <Car size={24} />
          <span>Véhicules</span>
        </Link>
        
        <Link to="/services" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/services') ? "text-taxi-blue font-medium" : "text-gray-500"
        )}>
          <FileText size={24} />
          <span>Services</span>
        </Link>
        
        <Link to="/locations" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/locations') ? "text-taxi-blue font-medium" : "text-gray-500"
        )}>
          <MapPin size={24} />
          <span>Centres</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout;
