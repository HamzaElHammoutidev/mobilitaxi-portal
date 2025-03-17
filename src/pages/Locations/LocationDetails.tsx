
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Calendar, Car, AlertTriangle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MobileLayout from '@/components/layout/MobileLayout';
import { useCenters } from '@/contexts/CenterContext';
import LocationMap from '@/components/map/Map';

const LocationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { centers } = useCenters();
  
  const center = centers.find(c => c.id === id);
  
  if (!center) {
    return (
      <MobileLayout title="Détails du centre" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Centre introuvable</p>
          <Button 
            onClick={() => navigate('/locations')}
            className="mt-4"
          >
            Retour aux centres
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Détails du centre" showBackButton>
      <div className="p-4">
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/70 rounded-lg p-6 mb-6 text-center">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-white" />
          <h2 className="text-xl font-bold text-white">{center.name}</h2>
          <p className="text-white/90">{center.address}</p>
        </div>
        
        <div className="flex gap-3 mb-6">
          <Button variant="outline" className="flex-1 py-6 flex flex-col gap-2 h-auto items-center justify-center" asChild>
            <a href={`tel:${center.phone || '0123456789'}`}>
              <Phone className="h-6 w-6 text-taxi-blue" />
              <span>Appeler</span>
            </a>
          </Button>
          
          <Button className="flex-1 py-6 flex flex-col gap-2 h-auto items-center justify-center bg-taxi-blue hover:bg-taxi-blue/90" asChild>
            <Link to="/appointments/new">
              <Calendar className="h-6 w-6" />
              <span>Rendez-vous</span>
            </Link>
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Horaires d'ouverture</h3>
            
            <div className="space-y-2">
              {center.hours.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.day}</span>
                  <span className="font-medium">
                    {item.open === 'Fermé' ? 'Fermé' : `${item.open} - ${item.close}`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Services disponibles</h3>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-taxi-yellow/20 p-2 rounded-full mr-3">
                  <Car className="h-5 w-5 text-taxi-yellow" />
                </div>
                <span>Inspection de taxi</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-taxi-yellow/20 p-2 rounded-full mr-3">
                  <Car className="h-5 w-5 text-taxi-yellow" />
                </div>
                <span>Réparation</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-taxi-yellow/20 p-2 rounded-full mr-3">
                  <Car className="h-5 w-5 text-taxi-yellow" />
                </div>
                <span>Changement de taximètre</span>
              </div>
              
              <Separator className="my-3" />
              
              <Button variant="outline" className="w-full" asChild>
                <Link to="/services">
                  Voir tous les services
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Adresse</h3>
            
            <div className="aspect-video bg-gray-200 rounded-md mb-3">
              <div className="w-full h-full">
                <LocationMap 
                  initialCenter={[center.coordinates.lng, center.coordinates.lat]}
                  initialZoom={15}
                  showUserLocation={false}
                />
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{center.address}</p>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank" rel="noopener noreferrer">
                  <Map className="h-4 w-4 mr-2" />
                  Google Maps
                </a>
              </Button>
              
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/locations/map">
                  <MapPin className="h-4 w-4 mr-2" />
                  Tous les centres
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default LocationDetails;
