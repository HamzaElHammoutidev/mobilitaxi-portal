
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
    <MobileLayout showHeader={true}>
      <div className="flex flex-col p-4 mt-2">
        {/* Welcome Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Bienvenue
        </h1>
        
        {/* Service Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <Button 
            className="bg-[#FFD500] hover:bg-yellow-400 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap"
            onClick={() => navigate('/appointments/new')}
          >
            Prendre rendez-vous
          </Button>
          
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap border"
            variant="outline"
            onClick={() => navigate('/services')}
          >
            Devis & Services
          </Button>
          
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap border"
            variant="outline"
            onClick={() => navigate('/documents')}
          >
            Documents
          </Button>
        </div>
        
        {/* Hero Banner */}
        <div className="bg-[#FFD500] rounded-3xl p-6 mb-8 relative overflow-hidden">
          <div className="max-w-[65%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Services de taxi professionnels
            </h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1 w-5 h-5 flex items-center justify-center">
                  <div className="bg-[#FF6B35] w-3 h-3 rounded-full"></div>
                </div>
                <span className="text-gray-800">Tarifs transparents</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1 w-5 h-5 flex items-center justify-center">
                  <div className="bg-[#FF6B35] w-3 h-3 rounded-full"></div>
                </div>
                <span className="text-gray-800">Service 24h/24</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-white rounded-full p-1 w-5 h-5 flex items-center justify-center">
                  <div className="bg-[#FF6B35] w-3 h-3 rounded-full"></div>
                </div>
                <span className="text-gray-800">Garantie qualité</span>
              </li>
            </ul>
            <Button 
              className="bg-white hover:bg-gray-50 text-gray-800 font-medium"
              onClick={() => navigate('/appointments/new')}
            >
              Réserver maintenant
            </Button>
          </div>
          <div className="absolute right-[-30px] bottom-[-20px] h-40 w-40 bg-[url('/lovable-uploads/9c0a1327-d508-4d37-9066-a5e0ebff9cdf.png')] bg-contain bg-no-repeat opacity-30"></div>
        </div>
        
        {/* Start Guide */}
        <Card className="mb-8 border shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="bg-gray-900 text-white p-3 rounded-full">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">Besoin d'aide?</h3>
                <p className="text-gray-600">Découvrez nos services de taxi et comment les utiliser.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate('/help')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Cases */}
        <Card className="mb-8 border shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Dossiers Actifs</h2>
            <p className="text-lg mb-4">Vous avez {activeAppointmentsCount} dossiers en cours.</p>
            <Button 
              className="bg-[#FFD500] hover:bg-yellow-400 text-gray-800 font-semibold px-6 py-2"
              onClick={() => navigate('/documents')}
            >
              Voir les détails
            </Button>
          </CardContent>
        </Card>
        
        {/* Quick Service Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Link to="/locations" className="flex flex-col items-center">
            <div className="bg-[#FFD500]/10 p-3 rounded-full mb-2">
              <MapPin className="h-6 w-6 text-[#FFD500]" />
            </div>
            <span className="text-xs text-center">Centres</span>
          </Link>
          
          <Link to="/appointments" className="flex flex-col items-center">
            <div className="bg-[#FFD500]/10 p-3 rounded-full mb-2">
              <Calendar className="h-6 w-6 text-[#FFD500]" />
            </div>
            <span className="text-xs text-center">Rendez-vous</span>
          </Link>
          
          <Link to="/services" className="flex flex-col items-center">
            <div className="bg-[#FFD500]/10 p-3 rounded-full mb-2">
              <FileText className="h-6 w-6 text-[#FFD500]" />
            </div>
            <span className="text-xs text-center">Devis</span>
          </Link>
          
          <Link to="/help" className="flex flex-col items-center">
            <div className="bg-[#FFD500]/10 p-3 rounded-full mb-2">
              <AlertCircle className="h-6 w-6 text-[#FFD500]" />
            </div>
            <span className="text-xs text-center">Aide</span>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
