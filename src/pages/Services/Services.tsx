
import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, Clock, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';
import { useVehicles } from '@/contexts/VehicleContext';

const Services = () => {
  const { services, quotes } = useServices();
  const { vehicles } = useVehicles();
  
  // Filter quotes
  const pendingQuotes = quotes.filter(quote => quote.status === 'pending');
  const completedQuotes = quotes.filter(quote => quote.status === 'approved' || quote.status === 'rejected');
  
  // Get vehicle information for quotes
  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.make + ' ' + vehicle.model : 'Véhicule';
  };
  
  return (
    <MobileLayout title="Services">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Services & Devis</h2>
          <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
            <Link to="/services/quotes/new">Nouveau devis</Link>
          </Button>
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
        
        {/* Quotes section */}
        <h3 className="font-medium mb-3">Mes devis</h3>
        
        <Tabs defaultValue="pending" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
          
          {/* Pending quotes */}
          <TabsContent value="pending">
            {pendingQuotes.length > 0 ? (
              <div className="space-y-3">
                {pendingQuotes.map(quote => (
                  <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                            <p className="text-sm text-gray-600">{getVehicleInfo(quote.vehicleId)}</p>
                            <p className="text-sm text-gray-600">{quote.services.length} services</p>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <Clock size={12} className="mr-1" />
                                En attente
                              </span>
                            </div>
                          </div>
                          <FileText className="h-8 w-8 text-amber-500 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Aucun devis en attente</p>
                <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
                  <Link to="/services/quotes/new">Demander un devis</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Completed quotes */}
          <TabsContent value="completed">
            {completedQuotes.length > 0 ? (
              <div className="space-y-3">
                {completedQuotes.map(quote => (
                  <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                            <p className="text-sm text-gray-600">{getVehicleInfo(quote.vehicleId)}</p>
                            <p className="text-sm text-gray-600">{quote.createdAt}</p>
                            <div className="mt-1">
                              {quote.status === 'approved' ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle size={12} className="mr-1" />
                                  Accepté
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <XCircle size={12} className="mr-1" />
                                  Refusé
                                </span>
                              )}
                            </div>
                          </div>
                          <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun devis terminé</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Recent services section */}
        <h3 className="font-medium mb-3">Services récents</h3>
        
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.slice(0, 3).map(service => (
              <Card key={service.id} className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {/* Display a placeholder date since services don't have createdAt */}
                        {new Date().toISOString().split('T')[0]}
                      </div>
                      <p className="text-sm text-gray-600">Catégorie: {service.category}</p>
                    </div>
                    <div>
                      <span className="font-medium">{service.price ? `${service.price} €` : 'Prix sur demande'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/services/history">Voir l'historique complet</Link>
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
