
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FileText, Clock, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';
import { useVehicles } from '@/contexts/VehicleContext';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getServiceById } = useServices();
  const { vehicles } = useVehicles();
  
  const service = getServiceById(id || '');
  
  if (!service) {
    return (
      <MobileLayout title="Détail du service" showBackButton>
        <div className="p-4 text-center">
          <FileText className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Service introuvable</p>
          <Button 
            onClick={() => navigate('/services')}
            className="mt-4"
          >
            Retour aux services
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Détail du service" showBackButton>
      <div className="p-4">
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/70 rounded-lg p-6 mb-6 text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-white" />
          <h2 className="text-xl font-bold text-white">{service.name}</h2>
          <p className="text-white/90">{service.category}</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Description</h3>
            <p className="text-gray-600">{service.description}</p>
            
            <div className="flex gap-4 mt-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-taxi-blue mr-2" />
                <span className="text-sm">{service.estimatedDuration} minutes</span>
              </div>
              
              {service.price && (
                <div className="flex items-center">
                  <span className="text-sm font-medium">{service.price.toFixed(2)} $</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Informations</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Ce service est disponible dans tous nos centres. Nous recommandons de prendre rendez-vous à l'avance pour éviter les temps d'attente.
              </p>
              <p className="text-sm text-gray-600">
                {service.category === 'Inspection' 
                  ? "L'inspection doit être effectuée annuellement pour tous les taxis." 
                  : service.category === 'Maintenance'
                  ? "Un entretien régulier est recommandé pour assurer la longévité de votre véhicule."
                  : service.category === 'Repair'
                  ? "Nos techniciens qualifiés peuvent diagnostiquer et réparer tous types de problèmes."
                  : "La certification est obligatoire pour exercer en tant que chauffeur de taxi."}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" 
            asChild
          >
            <Link to="/appointments/new">
              <Calendar className="h-5 w-5 mr-2" />
              Prendre rendez-vous
            </Link>
          </Button>
          
          {vehicles.length > 0 ? (
            <Button 
              className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
              onClick={() => {
                // Dans une vraie application, nous voudrions stocker l'ID du service
                // et rediriger vers une page pour sélectionner un véhicule
                navigate('/services/request-quote');
              }}
            >
              Demander un devis
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
            >
              <Link to="/vehicles">
                Ajouter un véhicule
              </Link>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full" 
            asChild
          >
            <Link to="/services">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à la liste
            </Link>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
