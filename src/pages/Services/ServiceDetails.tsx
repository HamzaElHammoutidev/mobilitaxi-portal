
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FileText, Clock, ArrowLeft, Calendar, MapPin, Tool, Phone, Tag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useCenters } from '@/contexts/CenterContext';
import { toast } from 'sonner';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getServiceById } = useServices();
  const { vehicles } = useVehicles();
  const { centers } = useCenters();
  
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
  
  const handleQuoteRequest = () => {
    if (vehicles.length === 0) {
      toast.error("Veuillez ajouter un véhicule avant de demander un devis");
      return;
    }
    
    // Store service ID in session storage
    sessionStorage.setItem('quoteServiceId', service.id);
    navigate('/services/request-quote');
  };
  
  return (
    <MobileLayout title="Détail du service" showBackButton>
      <div className="p-4">
        <div className="bg-gradient-to-r from-taxi-blue to-taxi-blue/70 rounded-lg p-6 mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <FileText className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white text-center">{service.name}</h2>
            <div className="flex justify-center mt-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {service.category}
              </Badge>
            </div>
          </div>
          
          {/* Background pattern */}
          <div className="absolute right-0 bottom-0 opacity-10">
            <Tool className="h-32 w-32 -rotate-12" />
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-3">À propos de ce service</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">
                  <Clock className="h-5 w-5 text-taxi-blue flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Durée estimée</p>
                    <p className="text-sm font-medium">{service.estimatedDuration} minutes</p>
                  </div>
                </div>
                
                {service.price && (
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md">
                    <Tag className="h-5 w-5 text-taxi-blue flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Prix</p>
                      <p className="text-sm font-medium">{service.price.toFixed(2)} $</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-3">Informations complémentaires</h3>
              <div className="space-y-3">
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
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-3">Nos centres</h3>
              <div className="space-y-2">
                {centers.slice(0, 2).map((center) => (
                  <Link key={center.id} to={`/locations/${center.id}`}>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-taxi-yellow/10 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-taxi-yellow" />
                        </div>
                        <div>
                          <p className="font-medium">{center.name}</p>
                          <p className="text-sm text-gray-500">{center.address}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
                <Link to="/locations" className="text-sm text-taxi-blue font-medium flex items-center justify-center p-2">
                  Voir tous les centres
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col gap-3 mt-6">
            <Button 
              className="w-full bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" 
              asChild
            >
              <Link to="/appointments/new">
                <Calendar className="h-5 w-5 mr-2" />
                Prendre rendez-vous
              </Link>
            </Button>
            
            <Button 
              className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
              onClick={handleQuoteRequest}
            >
              <FileText className="h-5 w-5 mr-2" />
              Demander un devis
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
            >
              <a href={`tel:+15551234567`}>
                <Phone className="h-5 w-5 mr-2" />
                Nous contacter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
