
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Car, Calendar, FileText, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return (
      <MobileLayout title="Détails du véhicule" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Véhicule introuvable</p>
          <Button 
            onClick={() => navigate('/vehicles')}
            className="mt-4"
          >
            Retour aux véhicules
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Détails du véhicule" showBackButton>
      <div className="p-4">
        <div className="bg-gradient-to-r from-taxi-yellow to-taxi-yellow/70 rounded-lg p-6 mb-6 text-center">
          <Car className="h-16 w-16 mx-auto mb-4 text-white" />
          <h2 className="text-xl font-bold text-white">{vehicle.make} {vehicle.model}</h2>
          <p className="text-white/90">{vehicle.year} • Plaque: {vehicle.licensePlate}</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Informations</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">Taxi</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro de série</span>
                <span className="font-medium">{vehicle.vin || "Non renseigné"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Couleur</span>
                <span className="font-medium">{vehicle.color || "Jaune"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Statut</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Actif
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Entretien</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-taxi-yellow" />
                  <span className="text-gray-600">Dernière inspection</span>
                </div>
                <span className="font-medium">12/03/2023</span>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-taxi-yellow" />
                  <span className="text-gray-600">Prochaine inspection</span>
                </div>
                <span className="font-medium">12/03/2024</span>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/appointments/new">
                    Prendre rendez-vous
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Documents</h3>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex justify-between items-center" asChild>
                <a href="/documents/vehicle-1">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-taxi-blue" />
                    Carte grise
                  </div>
                  <Info className="h-4 w-4 text-gray-400" />
                </a>
              </Button>
              
              <Button variant="outline" className="w-full flex justify-between items-center" asChild>
                <a href="/documents/vehicle-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-taxi-blue" />
                    Attestation d'assurance
                  </div>
                  <Info className="h-4 w-4 text-gray-400" />
                </a>
              </Button>
              
              <Button variant="outline" className="w-full flex justify-between items-center" asChild>
                <a href="/documents/vehicle-3">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-taxi-blue" />
                    Permis de taxi
                  </div>
                  <Info className="h-4 w-4 text-gray-400" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default VehicleDetails;
