
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Car, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MobileLayout from '@/components/layout/MobileLayout';
import { useCenters } from '@/contexts/CenterContext';

const CentersList = () => {
  const { centers, loading } = useCenters();
  
  return (
    <MobileLayout title="Centres du Taxi" showBackButton>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nos centres</h2>
          <Link to="/locations/map">
            <Button className="bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" size="sm">
              <Map className="h-4 w-4 mr-1" /> Voir la carte
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <p className="text-center py-8 text-gray-500">Chargement des centres...</p>
        ) : (
          <div className="space-y-4">
            {centers.map((center) => (
              <Link key={center.id} to={`/locations/${center.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-taxi-blue/10 p-3 rounded-full mt-1">
                        <MapPin className="h-6 w-6 text-taxi-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{center.name}</h3>
                        <p className="text-sm text-gray-500">{center.address}</p>
                        <p className="text-sm text-gray-500">{center.city}, {center.postalCode}</p>
                        
                        <div className="flex mt-2 gap-2">
                          <Button variant="outline" size="sm" className="text-xs" asChild>
                            <a href={`tel:${center.phone}`}>
                              <Phone className="h-3 w-3 mr-1" /> Appeler
                            </a>
                          </Button>
                          <Button size="sm" className="text-xs bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" asChild>
                            <Link to={`/locations/${center.id}`}>
                              <Car className="h-3 w-3 mr-1" /> Services
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CentersList;
