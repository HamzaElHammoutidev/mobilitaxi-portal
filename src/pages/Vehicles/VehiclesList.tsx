
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';
import { cn } from '@/lib/utils';

const VehiclesList = () => {
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  
  const handleVehicleClick = (id: string) => {
    navigate(`/vehicles/${id}`);
  };
  
  return (
    <MobileLayout title="Mes véhicules" showBackButton>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mes véhicules</h2>
          <Button className="bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </Button>
        </div>
        
        {vehicles.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
              <p className="text-lg font-medium mb-2">Aucun véhicule</p>
              <p className="text-gray-500 mb-4">Vous n'avez pas encore ajouté de véhicule.</p>
              <Button className="bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90">
                <Plus className="h-4 w-4 mr-1" /> Ajouter un véhicule
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleVehicleClick(vehicle.id)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-taxi-blue/10 p-3 rounded-full">
                        <Car className="h-6 w-6 text-taxi-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">{vehicle.make} {vehicle.model}</h3>
                        <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "bg-opacity-20 border-opacity-30",
                          vehicle.status === 'active'
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        )}
                      >
                        {vehicle.status === 'active' ? 'Actif' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Prochain entretien:</span>
                      <span className={cn(
                        new Date(vehicle.nextServiceDue) < new Date()
                          ? "text-red-600 font-medium"
                          : "text-gray-700"
                      )}>
                        {vehicle.nextServiceDue}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default VehiclesList;
