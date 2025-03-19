
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, FileText, AlertCircle, History, Scan, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNavbar from '@/components/layout/BottomNavbar';

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
    <MobileLayout title="Centre du Taxi">
      <div className="flex flex-col bg-gray-50 pb-20">
        {/* Hero Section with Gradient */}
        <div className="px-4 pt-4 pb-8">
          <div 
            className="rounded-3xl p-8 mb-6 text-center shadow-md overflow-hidden relative" 
            style={{
              background: 'linear-gradient(135deg, #ffcc33 0%, #e6b800 100%)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDAlTDE4MCA1MCAzMCA2MFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
            <h2 className="text-2xl font-bold text-white mb-2 relative z-10 text-shadow">
              Votre partenaire de confiance
            </h2>
            <p className="text-xl text-white/90 mb-6 relative z-10">
              pour l'entretien de votre taxi
            </p>
            <Button 
              className="bg-white text-yellow-600 hover:bg-yellow-50 px-6 py-6 rounded-xl text-lg font-semibold shadow-lg relative z-10 transition-all duration-300"
              onClick={() => navigate('/appointments/new')}
            >
              Prendre un rendez-vous
            </Button>
          </div>
          
          {/* Quick Access Icons with shadcn styling */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Link to="/locations" className="flex flex-col items-center">
              <div className="bg-yellow-100 p-3 rounded-2xl mb-2 shadow-sm transform hover:scale-105 transition-all duration-300 text-yellow-600">
                <MapPin className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-gray-700">Géolocalisation</span>
            </Link>
            
            <Link to="/appointments" className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-2xl mb-2 shadow-sm transform hover:scale-105 transition-all duration-300 text-blue-600">
                <Calendar className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-gray-700">Rendez-vous</span>
            </Link>
            
            <Link to="/services" className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-2xl mb-2 shadow-sm transform hover:scale-105 transition-all duration-300 text-green-600">
                <FileText className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-gray-700">Devis</span>
            </Link>
            
            <Link to="/help" className="flex flex-col items-center">
              <div className="bg-amber-100 p-3 rounded-2xl mb-2 shadow-sm transform hover:scale-105 transition-all duration-300 text-amber-600">
                <AlertCircle className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-gray-700">Réclamations</span>
            </Link>
          </div>
          
          {/* Active Cases with glassmorphism */}
          <Card className="mb-8 border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Dossiers Actifs</h2>
              <p className="text-lg mb-4 text-gray-600">Vous avez <span className="text-yellow-600 font-semibold">{activeAppointmentsCount}</span> dossiers en cours.</p>
              <Button 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-xl shadow transition-all duration-300"
                onClick={() => navigate('/documents')}
              >
                Voir les détails
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional Services Grid with modern cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link to="/history">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-5 flex flex-col items-center justify-center">
                  <div className="bg-yellow-100 p-4 rounded-xl mb-3 text-yellow-600">
                    <History className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Historique</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/documents/scan">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-5 flex flex-col items-center justify-center">
                  <div className="bg-sky-100 p-4 rounded-xl mb-3 text-sky-600">
                    <Scan className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Scanner Document</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/settings">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-5 flex flex-col items-center justify-center">
                  <div className="bg-yellow-100 p-4 rounded-xl mb-3 text-yellow-600">
                    <Settings className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Paramètres</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/help">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-5 flex flex-col items-center justify-center">
                  <div className="bg-amber-100 p-4 rounded-xl mb-3 text-amber-600">
                    <HelpCircle className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Aide</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavbar />
    </MobileLayout>
  );
};

export default Index;
