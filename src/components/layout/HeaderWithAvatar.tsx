
import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

interface HeaderWithAvatarProps {
  onMenuOpen: () => void;
}

const HeaderWithAvatar = ({ onMenuOpen }: HeaderWithAvatarProps) => {
  const { user } = useAuth();
  
  const firstName = user?.name?.split(' ')[0] || '';
  
  return (
    <header className="bg-white px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-yellow-100">
          <AvatarImage src="" alt={user?.name} />
          <AvatarFallback className="bg-[#FFD500] text-gray-800 text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm">Bonjour 👋</p>
          <h2 className="font-semibold text-lg text-gray-800">{firstName || 'Utilisateur'}</h2>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-white h-10 w-10 shadow-sm hover:bg-gray-50"
        onClick={onMenuOpen}
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </Button>
    </header>
  );
};

export default HeaderWithAvatar;
