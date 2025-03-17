
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Car, Calendar, Clock, AlertTriangle, Wrench, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';
import { cn } from '@/lib/utils';

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
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/70 rounded-lg p-6 mb-6 text-center">
          <Car className="h-16 w-16 mx-auto mb-4 text-white" />
          <h2 className="text-xl font-bold text-white">{vehicle.make} {vehicle.model}</h2>
          <p className="text-white/90">{vehicle.year} • {vehicle.licensePlate}</p>
          <div className="mt-2">
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              {vehicle.status === 'active' ? 'Actif' : 'En attente'}
            </Badge>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Informations</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Marque</span>
                <span className="font-medium">{vehicle.make}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Modèle</span>
                <span className="font-medium">{vehicle.model}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Année</span>
                <span className="font-medium">{vehicle.year}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Plaque d'immatriculation</span>
                <span className="font-medium">{vehicle.licensePlate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro VIN</span>
                <span className="font-medium">{vehicle.licensePlate.replace(/\s+/g, '') + "-VIN"}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Couleur</span>
                <span className="font-medium">Jaune</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Prochain entretien</h3>
              <Badge 
                variant="outline" 
                className={cn(
                  "bg-opacity-20 border-opacity-30",
                  new Date(vehicle.nextServiceDue) < new Date() 
                    ? "bg-red-100 text-red-800 border-red-200" 
                    : "bg-green-100 text-green-800 border-green-200"
                )}
              >
                {new Date(vehicle.nextServiceDue) < new Date() ? 'En retard' : 'Planifié'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Date prévue:</span>
                <span className="ml-auto font-medium">{vehicle.nextServiceDue}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Délai:</span>
                <span className="ml-auto font-medium">
                  {new Date(vehicle.nextServiceDue) < new Date() 
                    ? 'Dépassé'
                    : `${Math.ceil((new Date(vehicle.nextServiceDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours`}
                </span>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <Button className="w-full bg-taxi-blue hover:bg-taxi-blue/90" asChild>
              <Link to="/appointments/new">Prendre rendez-vous</Link>
            </Button>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Link to="/services" className="flex flex-col items-center">
                <Wrench className="h-10 w-10 mb-2 text-taxi-blue" />
                <span className="font-medium">Services</span>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Link to="/documents/scan" className="flex flex-col items-center">
                <FileText className="h-10 w-10 mb-2 text-taxi-blue" />
                <span className="font-medium">Scan documents</span>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <Info className="mr-2 h-4 w-4" /> 
              Historique du véhicule
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Inspection annuelle</p>
                  <p className="text-sm text-gray-600">15/01/2023</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">Changement d'huile</p>
                  <p className="text-sm text-gray-600">10/03/2023</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Remplacement du filtre</p>
                  <p className="text-sm text-gray-600">10/03/2023</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/vehicles/history">Voir tout l'historique</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default VehicleDetails;
