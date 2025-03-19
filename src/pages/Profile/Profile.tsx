
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, ChevronRight, Settings, FileText, Car, Calendar, CreditCard, HelpCircle, Lock } from 'lucide-react';
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
    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-base-200" onClick={handleClick}>
      <div className="flex items-center gap-3">
        <div className="avatar placeholder">
          <div className="bg-primary bg-opacity-20 text-primary rounded-full w-10 h-10">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <span>{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body p-6">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-16 h-16 text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <div className="flex items-center gap-1 opacity-75">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </div>
                <div className="mt-1">
                  <div className={cn(
                    "badge",
                    user?.status === 'pending' ? "badge-warning" : "badge-success"
                  )}>
                    {user?.status === 'pending' ? 'En attente de validation' : 'Compte validé'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body p-0">
            <h3 className="p-4 font-medium">Mon compte</h3>
            <div className="divider my-0"></div>
            <ProfileLink icon={User} label="Informations personnelles" to="/profile/personal-info" />
            <div className="divider my-0"></div>
            <ProfileLink icon={Lock} label="Sécurité" to="/profile/security" />
            <div className="divider my-0"></div>
            <ProfileLink icon={CreditCard} label="Paiements" to="/profile/payments" />
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body p-0">
            <h3 className="p-4 font-medium">Mes services</h3>
            <div className="divider my-0"></div>
            <ProfileLink icon={Car} label="Mes véhicules" to="/vehicles" />
            <div className="divider my-0"></div>
            <ProfileLink icon={Calendar} label="Mes rendez-vous" to="/appointments" />
            <div className="divider my-0"></div>
            <ProfileLink icon={FileText} label="Mes devis" to="/services/quotes" />
            <div className="divider my-0"></div>
            <ProfileLink icon={FileText} label="Mes factures" to="/invoices" />
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body p-0">
            <h3 className="p-4 font-medium">Application</h3>
            <div className="divider my-0"></div>
            <ProfileLink icon={Settings} label="Paramètres" to="/settings" />
            <div className="divider my-0"></div>
            <ProfileLink icon={HelpCircle} label="Aide & Support" to="/help" />
            <div className="divider my-0"></div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-base-200 text-error" onClick={() => document.getElementById('logout-modal')?.showModal()}>
              <div className="flex items-center gap-3">
                <div className="avatar placeholder">
                  <div className="bg-error bg-opacity-20 text-error rounded-full w-10 h-10">
                    <LogOut className="h-5 w-5" />
                  </div>
                </div>
                <span>Déconnexion</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout Modal */}
        <dialog id="logout-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Déconnexion</h3>
            <p className="py-4">Êtes-vous sûr de vouloir vous déconnecter de votre compte?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn mr-2">Annuler</button>
                <button 
                  className="btn btn-error"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Déconnexion en cours..." : "Déconnexion"}
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </MobileLayout>
  );
};

export default Profile;
