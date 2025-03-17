
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Car, FileText, MapPin, Menu, Settings, X, User, LogOut, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la déconnexion');
    }
  };
  
  const menuItems = [
    { title: 'Accueil', icon: Home, path: '/' },
    { title: 'Mes véhicules', icon: Car, path: '/vehicles' },
    { title: 'Rendez-vous', icon: Calendar, path: '/appointments' },
    { title: 'Services', icon: FileText, path: '/services' },
    { title: 'Centres', icon: MapPin, path: '/locations' },
    { title: 'Profil', icon: User, path: '/profile' },
    { title: 'Paramètres', icon: Settings, path: '/settings' },
    { title: 'Aide & Support', icon: HelpCircle, path: '/help' },
  ];
  
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
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-800"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>
      
      {/* Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="right" className="w-[85%] max-w-sm p-0">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="text-left flex items-center justify-between">
              <span>Menu</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          
          <div className="px-6 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="bg-taxi-yellow text-gray-800 text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="p-2">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md",
                    location.pathname === item.path 
                      ? "bg-taxi-yellow/10 text-taxi-yellow" 
                      : "hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    location.pathname === item.path ? "text-taxi-yellow" : ""
                  )} />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SheetClose>
            ))}
            
            <button
              className="flex items-center gap-3 p-3 rounded-md text-red-500 hover:bg-red-50 w-full text-left"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
      
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
        
        <Link to="/vehicles" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/vehicles') ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname.includes('/vehicles') ? "bg-taxi-yellow/20" : ""
          )}>
            <Car size={20} className={location.pathname.includes('/vehicles') ? "text-taxi-yellow" : ""} />
          </div>
          <span>Véhicules</span>
        </Link>
        
        <Link to="/appointments" className={cn(
          "flex flex-col items-center text-sm",
          location.pathname.includes('/appointments') ? "text-taxi-yellow font-medium" : "text-gray-500"
        )}>
          <div className={cn(
            "p-2 rounded-full",
            location.pathname.includes('/appointments') ? "bg-taxi-yellow/20" : ""
          )}>
            <Calendar size={20} className={location.pathname.includes('/appointments') ? "text-taxi-yellow" : ""} />
          </div>
          <span>Rendez-vous</span>
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
            <User size={20} className={location.pathname.includes('/profile') ? "text-taxi-yellow" : ""} />
          </div>
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout;
