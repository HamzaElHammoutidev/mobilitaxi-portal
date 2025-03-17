
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, FileText, User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: FileText, label: 'Services', path: '/services' },
    { icon: BookOpen, label: 'Documents', path: '/documents' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <div className="bottom-nav max-w-lg mx-auto">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center py-1",
              isActive ? "text-amber-500" : "text-gray-500"
            )}
          >
            <item.icon className={cn("h-6 w-6", isActive ? "text-amber-500" : "text-gray-500")} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
