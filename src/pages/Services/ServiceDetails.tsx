
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Car, Tool, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useServices } from '@/contexts/ServiceContext';
import MobileLayout from '@/components/layout/MobileLayout';
import { toast } from 'sonner';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services, addQuote } = useServices();
  
  // Find the service with the matching ID
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <MobileLayout title="Service introuvable" showBackButton>
        <div className="p-4 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <p>Le service demandé n'existe pas ou a été supprimé.</p>
          <Button className="mt-4" onClick={() => navigate('/services')}>
            Retour aux services
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  const handleRequestQuote = () => {
    addQuote({
      id: `quote-${Date.now()}`,
      services: [service],
      status: 'pending',
      total: service.price,
      createdAt: new Date().toLocaleDateString()
    });
    
    toast.success("Demande de devis envoyée avec succès");
    navigate('/services/quotes');
  };
  
  const getServiceIcon = () => {
    switch (service.category) {
      case "Maintenance":
        return <Tool className="h-6 w-6" />;
      case "Inspection":
        return <Car className="h-6 w-6" />;
      case "Repair":
        return <Tool className="h-6 w-6" />;
      case "Certification":
        return <FileText className="h-6 w-6" />;
      default:
        return <Tool className="h-6 w-6" />;
    }
  };
  
  return (
    <MobileLayout title={service.name} showBackButton>
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-taxi-yellow/10 text-taxi-yellow">
                {getServiceIcon()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{service.name}</h2>
                <p className="text-gray-600">{service.category}</p>
              </div>
            </div>
            
            <p className="mb-4">{service.description}</p>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Durée estimée: {service.estimatedTime}</span>
              </div>
              <span className="font-bold text-lg">{service.price} €</span>
            </div>
          </CardContent>
        </Card>
        
        {service.category === "Inspection" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">L'inspection comprend :</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vérification des points de sécurité</li>
                <li>Analyse des composants mécaniques</li>
                <li>Vérification des équipements obligatoires</li>
                <li>Diagnostic électronique</li>
                <li>Test des lumières et signalisation</li>
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="bg-taxi-yellow/10 border-taxi-yellow text-gray-800 hover:bg-taxi-yellow/20"
            onClick={() => navigate('/appointments/new', { state: { serviceId: service.id } })}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Rendez-vous
          </Button>
          
          <Button
            variant="outline"
            className="bg-taxi-blue/10 border-taxi-blue text-gray-800 hover:bg-taxi-blue/20"
            onClick={handleRequestQuote}
          >
            <FileText className="mr-2 h-4 w-4" />
            Demander un devis
          </Button>
        </div>
        
        <h3 className="font-medium mb-2">Informations complémentaires</h3>
        <p className="text-sm text-gray-600 mb-6">
          Ce service est disponible dans tous nos centres. Les rendez-vous sont généralement disponibles sous 48h. 
          Veuillez apporter votre carte grise lors de votre visite.
        </p>
        
        <Separator className="mb-6" />
        
        <Button 
          className="w-full bg-taxi-blue text-white hover:bg-taxi-blue/90"
          onClick={() => navigate('/locations')}
        >
          Trouver un centre
        </Button>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
