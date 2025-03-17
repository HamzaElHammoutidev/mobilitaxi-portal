import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Calendar, FileText, MapPin, History, FileCheck, Settings, HelpCircle, Search, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useServices } from '@/contexts/ServiceContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import MobileLayout from '@/components/layout/MobileLayout';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { vehicles } = useVehicles();
  const { services } = useServices();
  const { appointments } = useAppointments();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 flex-col">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <div className="bg-taxi-yellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Car size={40} className="text-taxi-dark" />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Centre du Taxi</h1>
          <p className="text-center text-gray-600 mb-8">
            Bienvenue sur la plateforme de gestion pour les chauffeurs de taxi
          </p>
          <div className="space-y-4">
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
      </div>
    );
  }

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  return (
    <MobileLayout title="Centre du Taxi">
      <div className="p-4">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/80 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Bonjour, {user?.name?.split(' ')[0]}</h2>
            <p className="text-white/90 mb-4">Que souhaitez-vous faire aujourd'hui?</p>
            <div className="flex gap-2">
              <Button 
                className="bg-white text-taxi-blue hover:bg-white/90"
                onClick={() => navigate('/appointments/new')}
                size="sm"
              >
                Prendre RDV
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate('/services')}
                size="sm"
              >
                Voir services
              </Button>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute right-0 bottom-0 opacity-10">
            <Car className="h-32 w-32 -rotate-12" />
          </div>
        </div>
        
        {/* Quick access section */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Link to="/services" className="flex flex-col items-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-1">
              <FileText className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-xs font-medium text-center">Services</span>
          </Link>
          
          <Link to="/appointments" className="flex flex-col items-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-1">
              <Calendar className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-xs font-medium text-center">Rendez-vous</span>
          </Link>
          
          <Link to="/vehicles" className="flex flex-col items-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-1">
              <Car className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-xs font-medium text-center">Véhicules</span>
          </Link>
          
          <Link to="/locations/map" className="flex flex-col items-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-1">
              <MapPin className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-xs font-medium text-center">Centres</span>
          </Link>
        </div>
        
        {/* Upcoming appointments */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Prochains rendez-vous</h3>
              <Link to="/appointments" className="text-sm text-taxi-blue font-medium">
                Tout voir
              </Link>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <Link key={apt.id} to={`/appointments/${apt.id}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-taxi-blue/10 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-taxi-blue" />
                        </div>
                        <div>
                          <p className="font-medium">{apt.service}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{new Date(apt.date).toLocaleDateString()} - {apt.time}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 mb-3">Aucun rendez-vous à venir</p>
                <Button 
                  className="bg-taxi-blue hover:bg-taxi-blue/90"
                  onClick={() => navigate('/appointments/new')}
                  size="sm"
                >
                  Prendre rendez-vous
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* My vehicles section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Mes véhicules</h3>
              <Link to="/vehicles" className="text-sm text-taxi-blue font-medium">
                Tout voir
              </Link>
            </div>
            
            {vehicles.length > 0 ? (
              <div className="space-y-3">
                {vehicles.slice(0, 2).map((vehicle) => (
                  <Link key={vehicle.id} to={`/vehicles/${vehicle.id}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-taxi-yellow/10 p-2 rounded-full">
                          <Car className="h-5 w-5 text-taxi-yellow" />
                        </div>
                        <div>
                          <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                          <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Car className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 mb-3">Aucun véhicule enregistré</p>
                <Button 
                  className="bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90"
                  onClick={() => navigate('/vehicles/new')}
                  size="sm"
                >
                  Ajouter un véhicule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Popular Services */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Services populaires</h3>
              <Link to="/services" className="text-sm text-taxi-blue font-medium">
                Tout voir
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {services.slice(0, 4).map((service) => (
                <Link key={service.id} to={`/services/${service.id}`}>
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 h-full flex flex-col">
                    <div className="bg-taxi-blue/10 p-2 rounded-full w-fit mb-2">
                      <FileText className="h-5 w-5 text-taxi-blue" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{service.name}</h4>
                    <p className="text-xs text-gray-500 flex-grow">{service.description.substring(0, 60)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-taxi-blue/10 text-taxi-blue px-2 py-1 rounded-full">
                        {service.estimatedDuration} min
                      </span>
                      {service.price && (
                        <span className="text-xs font-medium">{service.price.toFixed(2)} $</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Other features */}
        <h3 className="font-medium mb-3">Fonctionnalités</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/history" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-3">
              <History className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-sm font-medium">Historique</span>
          </Link>
          
          <Link to="/documents" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-3">
              <FileCheck className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-sm font-medium">Documents</span>
          </Link>
          
          <Link to="/settings" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-3">
              <Settings className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-sm font-medium">Paramètres</span>
          </Link>
          
          <Link to="/help" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="bg-taxi-yellow/10 p-3 rounded-full mb-3">
              <HelpCircle className="h-6 w-6 text-taxi-yellow" />
            </div>
            <span className="text-sm font-medium">Aide</span>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
