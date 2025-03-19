
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, FileText, AlertCircle, History, Scan, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import MobileLayout from '@/components/layout/MobileLayout';

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  path 
}: { 
  icon: React.ElementType, 
  title: string, 
  path: string 
}) => {
  return (
    <Link to={path} className="card bg-base-100 hover:bg-base-200 transition-colors shadow-sm hover:shadow p-3 flex flex-col items-center gap-2 text-center">
      <div className="rounded-full bg-primary/20 p-3 w-16 h-16 flex items-center justify-center">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <span className="text-sm font-medium mt-1">{title}</span>
    </Link>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { appointments } = useAppointments();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }
  
  const activeAppointmentsCount = appointments ? appointments.length : 0;
  
  return (
    <MobileLayout title={`Bonjour, ${user.name?.split(' ')[0]}`}>
      <div className="flex flex-col bg-base-200 pb-20">
        <div className="p-4">
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-4">
            <button className="btn btn-sm btn-primary rounded-full">Tous</button>
            <button className="btn btn-sm btn-ghost rounded-full">Centres</button>
            <button className="btn btn-sm btn-ghost rounded-full">Service</button>
            <button className="btn btn-sm btn-ghost rounded-full">Finances</button>
            <button className="btn btn-sm btn-ghost rounded-full">Rendez-vous</button>
          </div>
          
          {/* Promo Banner */}
          <div className="card bg-primary text-primary-content mb-6">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-lg mb-2">Offre spéciale</h2>
                  <ul className="text-sm space-y-1 mb-3">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-content"></div>
                      <span>10% de remise sur tous les services</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-content"></div>
                      <span>Diagnostic gratuit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-content"></div>
                      <span>Livraison à domicile</span>
                    </li>
                  </ul>
                  <button className="btn btn-sm btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary no-animation">
                    En savoir plus
                  </button>
                </div>
                <div className="badge badge-accent badge-lg">-10%</div>
              </div>
            </div>
          </div>
          
          {/* Service Grid */}
          <h2 className="font-bold text-lg mb-3">Nos services</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <ServiceCard icon={MapPin} title="Centres" path="/locations" />
            <ServiceCard icon={Calendar} title="Rendez-vous" path="/appointments" />
            <ServiceCard icon={FileText} title="Devis" path="/services/quotes" />
            <ServiceCard icon={AlertCircle} title="Aide" path="/help" />
            <ServiceCard icon={History} title="Historique" path="/history" />
            <ServiceCard icon={Scan} title="Scanner" path="/documents/scan" />
          </div>
          
          {/* Getting Started Card */}
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body p-4">
              <h2 className="card-title text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Commencer
              </h2>
              <p className="text-sm text-base-content/70 mb-3">Découvrez comment tirer le meilleur parti de votre application Centre du Taxi.</p>
              <div className="space-y-2">
                <Link to="/getting-started/1" className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <span className="font-medium">Ajouter un véhicule</span>
                  <ChevronRight className="h-5 w-5 opacity-50" />
                </Link>
                <Link to="/getting-started/2" className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <span className="font-medium">Prendre un rendez-vous</span>
                  <ChevronRight className="h-5 w-5 opacity-50" />
                </Link>
                <Link to="/getting-started/3" className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                  <span className="font-medium">Explorer les services</span>
                  <ChevronRight className="h-5 w-5 opacity-50" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Active Cases */}
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-2">Dossiers Actifs</h2>
              <p className="mb-3">Vous avez {activeAppointmentsCount} dossiers en cours.</p>
              <button 
                className="btn btn-primary btn-sm w-full"
                onClick={() => navigate('/documents')}
              >
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
