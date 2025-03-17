
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, FileText, AlertCircle, History, Scan, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import MobileLayout from '@/components/layout/MobileLayout';

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
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="p-4">
          <div className="bg-[#FFD500] rounded-3xl p-8 mb-6 text-center shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Votre partenaire de confiance
            </h2>
            <p className="text-xl text-gray-800 mb-6">
              pour l'entretien de votre taxi
            </p>
            <Button 
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-5 rounded-lg text-lg"
              onClick={() => navigate('/appointments/new')}
            >
              Prendre un rendez-vous
            </Button>
          </div>
          
          {/* Quick Access Icons */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Link to="/locations" className="flex flex-col items-center">
              <div className="bg-[#FFD500] p-3 rounded-lg mb-2 shadow-md transform hover:scale-105 transition-transform">
                <MapPin className="h-8 w-8 text-gray-800" />
              </div>
              <span className="text-sm text-center">Géolocalisation</span>
            </Link>
            
            <Link to="/appointments" className="flex flex-col items-center">
              <div className="bg-[#FFD500] p-3 rounded-lg mb-2 shadow-md transform hover:scale-105 transition-transform">
                <Calendar className="h-8 w-8 text-gray-800" />
              </div>
              <span className="text-sm text-center">Rendez-vous</span>
            </Link>
            
            <Link to="/services" className="flex flex-col items-center">
              <div className="bg-[#FFD500] p-3 rounded-lg mb-2 shadow-md transform hover:scale-105 transition-transform">
                <FileText className="h-8 w-8 text-gray-800" />
              </div>
              <span className="text-sm text-center">Devis</span>
            </Link>
            
            <Link to="/help" className="flex flex-col items-center">
              <div className="bg-[#FFD500] p-3 rounded-lg mb-2 shadow-md transform hover:scale-105 transition-transform">
                <AlertCircle className="h-8 w-8 text-gray-800" />
              </div>
              <span className="text-sm text-center">Réclamations</span>
            </Link>
          </div>
          
          {/* Active Cases */}
          <Card className="mb-8 border shadow-sm">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Dossiers Actifs</h2>
              <p className="text-lg mb-4">Vous avez {activeAppointmentsCount} dossiers en cours.</p>
              <Button 
                className="bg-[#FFD500] hover:bg-yellow-400 text-gray-800 font-semibold px-6 py-2"
                onClick={() => navigate('/appointments')}
              >
                Voir les détails
              </Button>
            </CardContent>
          </Card>
          
          {/* Additional Services Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link to="/history">
              <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="bg-[#FFD500] p-4 rounded-lg mb-3 shadow-sm">
                    <History className="h-8 w-8 text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-lg">Historique</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/documents/scan">
              <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="bg-[#FFD500] p-4 rounded-lg mb-3 shadow-sm">
                    <Scan className="h-8 w-8 text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-lg">Scanner Document</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/settings">
              <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="bg-[#FFD500] p-4 rounded-lg mb-3 shadow-sm">
                    <Settings className="h-8 w-8 text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-lg">Paramètres</h3>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/help">
              <Card className="border shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="bg-[#FFD500] p-4 rounded-lg mb-3 shadow-sm">
                    <HelpCircle className="h-8 w-8 text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-lg">Aide</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
