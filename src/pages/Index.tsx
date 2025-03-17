
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, Calendar, MapPin, Clock, FileText, 
  ChevronRight, Bell, Settings, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { useCenters } from '@/contexts/CenterContext';
import MobileLayout from '@/components/layout/MobileLayout';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { vehicles } = useVehicles();
  const { appointments } = useAppointments();
  const { centers } = useCenters();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }
  
  const upcomingAppointment = appointments.length > 0 ? appointments[0] : null;
  const userVehicle = vehicles.length > 0 ? vehicles[0] : null;
  const nearestCenter = centers.length > 0 ? centers[0] : null;
  
  return (
    <MobileLayout title="Centre du Taxi">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Bonjour, {user.name}</h1>
          <p className="text-gray-600">Bienvenue au Centre du Taxi</p>
        </div>
        
        {upcomingAppointment && (
          <Card className="mb-6 bg-taxi-yellow/10 border-taxi-yellow">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">Prochain rendez-vous</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-taxi-yellow p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{upcomingAppointment.date}</p>
                    <p className="text-sm text-gray-600">{upcomingAppointment.time}</p>
                    <p className="text-sm text-gray-600">{upcomingAppointment.services}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/appointments/${upcomingAppointment.id}`)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link to="/vehicles" className="feature-card">
            <div className="bg-taxi-blue/10 p-3 rounded-full mb-3">
              <Car className="h-6 w-6 text-taxi-blue" />
            </div>
            <h3 className="font-medium text-center">Mes véhicules</h3>
          </Link>
          
          <Link to="/appointments" className="feature-card">
            <div className="bg-taxi-blue/10 p-3 rounded-full mb-3">
              <Calendar className="h-6 w-6 text-taxi-blue" />
            </div>
            <h3 className="font-medium text-center">Rendez-vous</h3>
          </Link>
          
          <Link to="/services" className="feature-card">
            <div className="bg-taxi-blue/10 p-3 rounded-full mb-3">
              <FileText className="h-6 w-6 text-taxi-blue" />
            </div>
            <h3 className="font-medium text-center">Services</h3>
          </Link>
          
          <Link to="/locations" className="feature-card">
            <div className="bg-taxi-blue/10 p-3 rounded-full mb-3">
              <MapPin className="h-6 w-6 text-taxi-blue" />
            </div>
            <h3 className="font-medium text-center">Centres</h3>
          </Link>
        </div>
        
        {userVehicle && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Mon véhicule</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/vehicles">Voir tous</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Car className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{userVehicle.make} {userVehicle.model}</p>
                    <p className="text-sm text-gray-600">{userVehicle.year}</p>
                    <p className="text-sm text-gray-600">Plaque: {userVehicle.licensePlate}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/vehicles/${userVehicle.id}`)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {nearestCenter && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">Centre le plus proche</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/locations">Voir tous</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{nearestCenter.name}</p>
                    <p className="text-sm text-gray-600">{nearestCenter.address}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Ouvert: 8h - 18h
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => navigate(`/locations/${nearestCenter.id}`)}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MobileLayout>
  );
};

export default Index;
