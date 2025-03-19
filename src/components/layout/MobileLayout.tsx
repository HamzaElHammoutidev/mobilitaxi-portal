
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Car, FileText, MapPin, Menu, Settings, X, User, LogOut, HelpCircle, Wallet, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import BottomNavbar from './BottomNavbar';

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
    <div className="flex flex-col min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          {showBackButton ? (
            <button 
              className="btn btn-ghost btn-circle"
              onClick={handleBack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Car size={18} className="text-primary" />
              <span className="font-medium text-lg">{title || 'Centre du Taxi'}</span>
            </div>
          )}
        </div>
        
        <div className="navbar-end">
          <button 
            className="btn btn-ghost btn-circle"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Drawer for sidebar menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`drawer drawer-end ${sidebarOpen ? 'drawer-open' : ''}`}>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={sidebarOpen} readOnly />
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay" onClick={() => setSidebarOpen(false)}></label>
            <div className="menu p-4 w-80 h-full bg-base-100 text-base-content">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Menu</span>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {user && (
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold">{user.name}</h2>
                      <p className="text-sm opacity-75">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="divider"></div>
              
              <ul className="menu menu-md">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={location.pathname === item.path ? "active" : ""}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </li>
                ))}
                
                <li>
                  <Link 
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Mon profil
                  </Link>
                </li>
                
                <li>
                  <a className="text-error" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow pb-20">
        {children}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default MobileLayout;
