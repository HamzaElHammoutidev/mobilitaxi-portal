
import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface HeaderWithAvatarProps {
  onMenuOpen: () => void;
}

const HeaderWithAvatar = ({ onMenuOpen }: HeaderWithAvatarProps) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border border-amber-100">
          <AvatarImage src="/lovable-uploads/cf384599-e3d3-4d8f-8b17-f41ff4ebdb4d.png" alt={user?.name} />
          <AvatarFallback className="bg-amber-50 text-amber-900 text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm flex items-center">
            Hello <span className="ml-1">👋</span>
          </p>
          <h2 className="font-medium text-lg text-gray-800">
            {user?.name || 'Sarah Wilson'}
          </h2>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-white h-10 w-10 border border-gray-100 hover:bg-gray-50"
        onClick={onMenuOpen}
      >
        <Menu className="h-5 w-5 text-gray-800" />
      </Button>
    </header>
  );
};

export default HeaderWithAvatar;
