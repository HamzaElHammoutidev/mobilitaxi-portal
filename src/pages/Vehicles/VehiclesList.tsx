
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, AlertTriangle, Clock } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';
import { cn } from '@/lib/utils';

const VehiclesList = () => {
  const { vehicles } = useVehicles();
  
  return (
    <MobileLayout title="Mes Véhicules">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Véhicules</h2>
        
        {vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map(vehicle => (
              <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {vehicle.make} {vehicle.model} {vehicle.year}
                        </p>
                        <p className="text-sm text-gray-600">
                          Plaque: {vehicle.licensePlate}
                        </p>
                        <div className="flex mt-2 space-x-2">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                            vehicle.status === 'active' 
                              ? "bg-green-100 text-green-800" 
                              : vehicle.status === 'inactive'
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          )}>
                            {vehicle.status === 'active' 
                              ? 'Actif' 
                              : vehicle.status === 'inactive'
                                ? 'Inactif'
                                : 'En attente'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <Car className="h-8 w-8 text-taxi-blue mb-2" />
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>Prochain service: {vehicle.nextServiceDue}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Alert if documents are expiring soon */}
                    {vehicle.documents.some(doc => 
                      doc.expiryDate && 
                      new Date(doc.expiryDate) < new Date(new Date().setMonth(new Date().getMonth() + 1))
                    ) && (
                      <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                        <AlertTriangle size={16} className="text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-xs text-amber-800">
                          Un ou plusieurs documents arrivent à expiration. Veuillez les mettre à jour.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Car className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">Aucun véhicule associé</p>
            <p className="text-sm text-gray-500 mb-4">
              Vos véhicules seront associés lors de votre prochaine visite à un centre.
            </p>
            <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
              <Link to="/appointments/new">Prendre rendez-vous</Link>
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default VehiclesList;
