
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import Map from '@/components/map/Map';
import { useCenters } from '@/contexts/CenterContext';

const LocationsMap = () => {
  const { centers, loading } = useCenters();
  
  return (
    <MobileLayout title="Centres du Taxi" showBackButton>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Nos centres</h2>
          <Link to="/locations">
            <Button variant="outline" size="sm">
              <List className="h-4 w-4 mr-2" />
              Liste
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Chargement des centres...</p>
          </div>
        ) : (
          <div className="flex-1">
            <Map showUserLocation={true} />
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default LocationsMap;
