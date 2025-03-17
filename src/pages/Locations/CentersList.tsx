
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useCenters } from '@/contexts/CenterContext';

const CentersList = () => {
  const { centers } = useCenters();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter centers based on search query
  const filteredCenters = centers.filter(center => 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MobileLayout title="Centres de service">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Trouver un centre</h2>
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par nom, adresse ou ville..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredCenters.length > 0 ? (
          <div className="space-y-4">
            {filteredCenters.map(center => (
              <Link to={`/locations/${center.id}`} key={center.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-taxi-blue rounded-full p-2 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{center.name}</h3>
                        <p className="text-sm text-gray-600">
                          {center.address}, {center.city}, {center.postalCode}
                        </p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone size={12} className="mr-1" />
                            {center.phone}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Mail size={12} className="mr-1" />
                            {center.email}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Heures d'ouverture:</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {center.hours.slice(0, 3).map(hour => (
                              <div key={hour.day} className="flex items-center text-xs text-gray-600">
                                <Clock size={10} className="mr-1" />
                                <span className="w-16 inline-block">{hour.day}:</span>
                                {hour.open === 'Fermé' ? (
                                  <span>Fermé</span>
                                ) : (
                                  <span>{hour.open} - {hour.close}</span>
                                )}
                              </div>
                            ))}
                            <div className="col-span-2 text-xs text-taxi-blue">
                              Voir plus...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Aucun centre trouvé</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default CentersList;
