
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, FileText, User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { title: 'Accueil', icon: Home, path: '/' },
    { title: 'Recherche', icon: Search, path: '/search' },
    { title: 'Services', icon: FileText, path: '/services' },
    { title: 'Dossiers', icon: BookOpen, path: '/documents' },
    { title: 'Profil', icon: User, path: '/profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center p-3 shadow-lg backdrop-blur-sm bg-white/90 z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className="flex flex-col items-center"
        >
          <div className={cn(
            "p-1 rounded-full transition-all duration-300",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path))) 
              ? "bg-yellow-100 text-yellow-600" 
              : "text-gray-500 hover:text-yellow-400"
          )}>
            <item.icon size={20} strokeWidth={2} className={cn(
              "transition-all duration-300",
              (location.pathname === item.path || 
               (item.path !== '/' && location.pathname.startsWith(item.path))) 
                ? "text-yellow-600" 
                : ""
            )} />
          </div>
          <span className={cn(
            "text-xs mt-1 font-medium transition-all duration-300",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path)))
              ? "text-yellow-600" 
              : "text-gray-500"
          )}>
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavbar;
