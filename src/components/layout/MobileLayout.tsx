import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Car, FileText, MapPin, Menu, Settings, X, User, LogOut, HelpCircle, Wallet, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import BottomNavbar from './BottomNavbar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

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
    { title: 'Centres', icon: MapPin, path: '/locations' },
    { title: 'Finances', icon: Wallet, path: '/finances' },
    { title: 'Paramètres', icon: Settings, path: '/settings' },
    { title: 'Aide & Support', icon: HelpCircle, path: '/help' },
  ];
  
  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          {showBackButton ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="text-gray-600 hover:bg-gray-100 mr-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
          ) : null}
          
          <div className="flex items-center">
            <Car size={18} className="text-gray-600 mr-2" />
            <h1 className="text-lg font-medium text-gray-800">
              {title || 'Centre du Taxi'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/finances" className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  location.pathname === "/finances" 
                    ? "bg-gray-100 text-gray-800" 
                    : "text-gray-600 hover:bg-gray-50"
                )}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Finances
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
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
            
            <SheetClose asChild>
              <Link 
                to="/profile"
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md",
                  location.pathname === "/profile" 
                    ? "bg-taxi-yellow/10 text-taxi-yellow" 
                    : "hover:bg-gray-100"
                )}
              >
                <User className={cn(
                  "h-5 w-5",
                  location.pathname === "/profile" ? "text-taxi-yellow" : ""
                )} />
                <span className="font-medium">Mon profil</span>
              </Link>
            </SheetClose>
            
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
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default MobileLayout;
