
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Calendar, FileText, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-taxi-gray p-4 flex-col">
        <div className="bg-taxi-yellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Car size={40} className="text-taxi-dark" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-taxi-blue">Centre du Taxi</h1>
        <div className="w-full max-w-md space-y-4">
          <Button 
            className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-taxi-blue text-taxi-blue hover:bg-taxi-blue/10"
            onClick={() => navigate('/register')}
          >
            Créer un compte
          </Button>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Bonjour, {user?.name}</h2>
          <p className="text-gray-600">
            {user?.status === 'pending' 
              ? 'Votre compte est en attente de validation.'
              : 'Bienvenue sur votre portail Centre du Taxi.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="bg-taxi-yellow/20 p-3 rounded-full mb-2">
                <Calendar className="text-taxi-blue" size={24} />
              </div>
              <span className="text-sm font-medium">Rendez-vous</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="bg-taxi-yellow/20 p-3 rounded-full mb-2">
                <Car className="text-taxi-blue" size={24} />
              </div>
              <span className="text-sm font-medium">Véhicules</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="bg-taxi-yellow/20 p-3 rounded-full mb-2">
                <FileText className="text-taxi-blue" size={24} />
              </div>
              <span className="text-sm font-medium">Services</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="bg-taxi-yellow/20 p-3 rounded-full mb-2">
                <MapPin className="text-taxi-blue" size={24} />
              </div>
              <span className="text-sm font-medium">Centres</span>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-taxi-yellow/10 border-taxi-yellow mb-6">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="bg-taxi-yellow p-2 rounded-full mr-3">
                <Phone className="text-taxi-dark" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-taxi-dark">Besoin d'aide?</h3>
                <p className="text-sm text-gray-600">Contactez notre équipe de support</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="w-full border-taxi-blue text-taxi-blue hover:bg-taxi-blue/10"
          onClick={logout}
        >
          Se déconnecter
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Index;
