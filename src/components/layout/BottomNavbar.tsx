
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
    <div className="btm-nav btm-nav-sm bg-base-100 shadow-lg z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className={cn(
            "text-xs",
            (location.pathname === item.path || 
             (item.path !== '/' && location.pathname.startsWith(item.path)))
              ? "active text-primary" 
              : "text-gray-600"
          )}
        >
          <item.icon size={20} />
          <span className="btm-nav-label">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;
