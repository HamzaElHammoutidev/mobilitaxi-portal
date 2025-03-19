
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, UserCircle, KeyRound, CreditCard, LogOut, ShieldCheck, Bell, HelpCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';

const ProfileSection = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: Array<{ 
    icon: React.ElementType; 
    label: string; 
    path?: string; 
    onClick?: () => void; 
  }>; 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-base-content/70 font-medium text-sm mb-2 px-1">{title}</h3>
      <div className="card bg-base-100 shadow-sm overflow-hidden">
        {items.map((item, index) => {
          const ItemIcon = item.icon;
          const content = (
            <div className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-base-200 transition-colors">
              <div className="flex items-center gap-3">
                <ItemIcon className="h-5 w-5 text-primary" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 opacity-50" />
            </div>
          );
          
          return item.path ? (
            <Link key={index} to={item.path}>{content}</Link>
          ) : (
            <button 
              key={index} 
              className="w-full text-left" 
              onClick={item.onClick}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  
  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };
  
  const userInfo = [
    { 
      icon: UserCircle, 
      label: 'Informations personnelles', 
      path: '/profile/personal-info' 
    },
    { 
      icon: KeyRound, 
      label: 'Sécurité', 
      path: '/profile/security' 
    },
    { 
      icon: CreditCard, 
      label: 'Paiement', 
      path: '/profile/payments'
    },
  ];
  
  const settings = [
    { 
      icon: ShieldCheck, 
      label: 'Confidentialité', 
      path: '/settings/privacy' 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      path: '/settings/notifications' 
    },
    { 
      icon: HelpCircle, 
      label: 'Aide et support', 
      path: '/help' 
    },
    { 
      icon: LogOut, 
      label: 'Déconnexion', 
      onClick: () => setShowLogoutModal(true) 
    },
  ];

  return (
    <MobileLayout title="Profil">
      <div className="p-4 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name || 'User'} />
              ) : (
                <UserCircle className="h-10 w-10" />
              )}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl">{user?.name || 'Utilisateur'}</h2>
            <p className="text-base-content/70">{user?.email || 'email@example.com'}</p>
          </div>
        </div>
        
        <ProfileSection title="Compte" items={userInfo} />
        <ProfileSection title="Paramètres" items={settings} />
        
        <p className="text-center text-xs text-base-content/50 mt-8">
          Version 1.0.0
        </p>
      </div>
      
      {/* Logout confirmation modal using DaisyUI */}
      <input
        type="checkbox"
        id="logout-modal"
        className="modal-toggle"
        checked={showLogoutModal}
        onChange={() => setShowLogoutModal(!showLogoutModal)}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmer la déconnexion</h3>
          <p className="py-4">Êtes-vous sûr de vouloir vous déconnecter?</p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setShowLogoutModal(false)}>
              Annuler
            </button>
            <button className="btn btn-primary" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
        <label className="modal-backdrop" onClick={() => setShowLogoutModal(false)}></label>
      </div>
    </MobileLayout>
  );
};

export default Profile;
