
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Plus, AlertTriangle } from 'lucide-react';
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
          <button className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4 mr-1" /> Ajouter
          </button>
        </div>
        
        {vehicles.length === 0 ? (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body p-8 text-center">
              <div className="avatar placeholder mb-4">
                <div className="bg-warning text-warning-content rounded-full w-16 h-16 mx-auto">
                  <AlertTriangle className="h-8 w-8" />
                </div>
              </div>
              <h3 className="card-title text-lg justify-center mb-2">Aucun véhicule</h3>
              <p className="opacity-75 mb-4">Vous n'avez pas encore ajouté de véhicule.</p>
              <button className="btn btn-primary">
                <Plus className="h-4 w-4 mr-1" /> Ajouter un véhicule
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="card bg-base-100 shadow-sm cursor-pointer hover:shadow transition-shadow" 
                onClick={() => handleVehicleClick(vehicle.id)}
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded-full w-12">
                          <Car className="h-6 w-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{vehicle.make} {vehicle.model}</h3>
                        <p className="text-sm opacity-75">{vehicle.year} • {vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <div>
                      <div className={cn(
                        "badge",
                        vehicle.status === 'active'
                          ? "badge-success"
                          : "badge-warning"
                      )}>
                        {vehicle.status === 'active' ? 'Actif' : 'En attente'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-base-300">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-75">Prochain entretien:</span>
                      <span className={cn(
                        new Date(vehicle.nextServiceDue) < new Date()
                          ? "text-error font-medium"
                          : ""
                      )}>
                        {vehicle.nextServiceDue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default VehiclesList;
