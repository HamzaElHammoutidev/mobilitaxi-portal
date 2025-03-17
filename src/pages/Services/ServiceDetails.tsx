
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Euro, ShieldCheck, Wrench, AlertTriangle } from 'lucide-react';
import { useServices } from '@/contexts/ServiceContext';
import MobileLayout from '@/components/layout/MobileLayout';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services } = useServices();
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <MobileLayout title="Détails du service" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
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
    <MobileLayout title="Détails du service" showBackButton>
      <div className="p-4">
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/70 rounded-lg p-6 mb-6 text-center">
          <div className="bg-white/20 p-4 rounded-full inline-flex mb-4">
            {service.category === 'maintenance' ? (
              <Wrench className="h-10 w-10 text-white" />
            ) : (
              <ShieldCheck className="h-10 w-10 text-white" />
            )}
          </div>
          <h2 className="text-xl font-bold text-white">{service.name}</h2>
          <p className="text-white/90">{service.category}</p>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Description</h3>
            <p className="text-gray-700">{service.description}</p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between py-2">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-gray-600" />
                <span>Durée estimée</span>
              </div>
              <span className="font-medium">{service.duration}</span>
            </div>
            
            <div className="flex justify-between py-2 border-t">
              <div className="flex items-center">
                <Euro className="h-5 w-5 mr-3 text-gray-600" />
                <span>Prix</span>
              </div>
              <span className="font-medium">{service.price} €</span>
            </div>
          </CardContent>
        </Card>
        
        {service.category === 'inspection' && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Points d'inspection</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vérification du taximètre</li>
                <li>Contrôle des freins</li>
                <li>Inspection des phares et feux</li>
                <li>Vérification de la carrosserie</li>
                <li>Contrôle de l'état des pneus</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="flex gap-3 mb-6">
          <Button variant="outline" className="flex-1 py-6 flex flex-col gap-2 h-auto items-center justify-center">
            <Calendar className="h-6 w-6 text-taxi-blue" />
            <span>Demander un devis</span>
          </Button>
          
          <Button 
            className="flex-1 py-6 flex flex-col gap-2 h-auto items-center justify-center bg-taxi-blue hover:bg-taxi-blue/90"
            onClick={() => navigate('/appointments/new')}
          >
            <Calendar className="h-6 w-6" />
            <span>Prendre RDV</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
