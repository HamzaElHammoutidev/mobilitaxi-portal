
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 shadow-lg">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className={cn(
            "flex flex-col items-center",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path)))
              ? "text-[#FFD500]" 
              : "text-gray-600"
          )}
        >
          <div className={cn(
            "p-1",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path))) 
              ? "text-[#FFD500]" 
              : "text-gray-600"
          )}>
            <item.icon size={24} />
          </div>
          <span className="text-xs">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavbar;
