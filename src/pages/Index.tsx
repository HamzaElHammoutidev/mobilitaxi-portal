
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, FileText, AlertCircle, History, Scan, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Centre du Taxi</h1>
        <button className="text-gray-800">
          <img src="/lovable-uploads/d23a3c8b-dbbb-4d21-897b-d871d3d806bb.png" alt="Menu" className="w-6 h-6" />
        </button>
      </header>
      
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
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 shadow-lg">
        <Link to="/" className="flex flex-col items-center text-yellow-500">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-xs">Accueil</span>
        </Link>
        
        <Link to="/search" className="flex flex-col items-center text-gray-600">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="text-xs">Recherche</span>
        </Link>
        
        <Link to="/services" className="flex flex-col items-center text-gray-600">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-xs">Services</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center text-gray-600">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-xs">Profil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Index;
