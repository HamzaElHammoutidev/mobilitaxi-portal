
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, ChevronRight, Settings, FileText, Car, Calendar, CreditCard, HelpCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const ProfileLink = ({ 
  icon: Icon, 
  label, 
  to, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  to?: string, 
  onClick?: () => void 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50" onClick={handleClick}>
      <div className="flex items-center gap-3">
        <div className="bg-taxi-yellow/10 p-2 rounded-full">
          <Icon className="h-5 w-5 text-taxi-yellow" />
        </div>
        <span>{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await logout();
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la déconnexion');
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  return (
    <MobileLayout title="Profil">
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="bg-taxi-yellow text-gray-800 text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-600 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
                <div className="mt-1">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    user?.status === 'pending' ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                  )}>
                    {user?.status === 'pending' ? 'En attente de validation' : 'Compte validé'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <div className="rounded-lg overflow-hidden divide-y">
            <h3 className="p-4 font-medium">Mon compte</h3>
            <ProfileLink icon={User} label="Informations personnelles" to="/profile/personal-info" />
            <ProfileLink icon={Lock} label="Sécurité" to="/profile/security" />
            <ProfileLink icon={CreditCard} label="Paiements" to="/profile/payments" />
          </div>
        </Card>
        
        <Card className="mb-6">
          <div className="rounded-lg overflow-hidden divide-y">
            <h3 className="p-4 font-medium">Mes services</h3>
            <ProfileLink icon={Car} label="Mes véhicules" to="/vehicles" />
            <ProfileLink icon={Calendar} label="Mes rendez-vous" to="/appointments" />
            <ProfileLink icon={FileText} label="Mes devis" to="/services/quotes" />
            <ProfileLink icon={FileText} label="Mes factures" to="/documents/invoices" />
          </div>
        </Card>
        
        <Card className="mb-6">
          <div className="rounded-lg overflow-hidden divide-y">
            <h3 className="p-4 font-medium">Application</h3>
            <ProfileLink icon={Settings} label="Paramètres" to="/settings" />
            <ProfileLink icon={HelpCircle} label="Aide & Support" to="/help" />
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 text-red-500">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <LogOut className="h-5 w-5 text-red-500" />
                    </div>
                    <span>Déconnexion</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Déconnexion</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir vous déconnecter de votre compte?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                    Annuler
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Déconnexion en cours..." : "Déconnexion"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Profile;
