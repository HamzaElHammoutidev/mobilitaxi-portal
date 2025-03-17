
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Car, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { title: 'Accueil', icon: Home, path: '/' },
    { title: 'Véhicules', icon: Car, path: '/vehicles' },
    { title: 'Rendez-vous', icon: Calendar, path: '/appointments' },
    { title: 'Services', icon: FileText, path: '/services' },
    { title: 'Profil', icon: User, path: '/profile' },
  ];
  
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className={cn(
            "flex flex-col items-center text-sm",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path)))
              ? "text-taxi-yellow font-medium" 
              : "text-gray-500"
          )}
        >
          <div className={cn(
            "p-2 rounded-full",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path))) 
              ? "bg-taxi-yellow/20" 
              : ""
          )}>
            <item.icon 
              size={20} 
              className={
                (location.pathname === item.path || 
                 (item.path !== '/' && location.pathname.startsWith(item.path)))
                  ? "text-taxi-yellow" 
                  : ""
              } 
            />
          </div>
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavbar;
