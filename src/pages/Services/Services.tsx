
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, Clock, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';

const Services = () => {
  const { services } = useServices();
  
  return (
    <MobileLayout title="Services">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Catalogue de services</h2>
        </div>
        
        {/* Services section */}
        <Card className="mb-6 bg-taxi-yellow/10 border-taxi-yellow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-1">Services disponibles</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Découvrez nos services pour votre taxi
                </p>
                <Button asChild variant="outline" className="border-taxi-yellow text-taxi-dark hover:bg-taxi-yellow/20">
                  <Link to="/services/list">Voir les services</Link>
                </Button>
              </div>
              <div className="bg-taxi-yellow rounded-full p-3">
                <Wrench className="h-6 w-6 text-taxi-dark" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent services section */}
        <h3 className="font-medium mb-3">Services récents</h3>
        
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.slice(0, 3).map(service => (
              <Link to={`/services/${service.id}`} key={service.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">Catégorie: {service.category}</p>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            <Clock size={12} className="mr-1" />
                            {service.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">{service.price ? `${service.price} €` : 'Prix sur demande'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/services/list">Voir tous les services</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Car className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Aucun service récent</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Services;
