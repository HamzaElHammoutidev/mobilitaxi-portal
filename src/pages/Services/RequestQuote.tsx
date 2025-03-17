
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';

const RequestQuote = () => {
  const navigate = useNavigate();
  const { services, loading, requestQuote } = useServices();
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);
  
  const handleToggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Using "v1" as a placeholder for vehicle ID - in a real application, 
      // you'd get this from context or params
      await requestQuote('v1', selectedServices);
      toast.success('Demande de devis envoyée avec succès');
      navigate('/services/quotes');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la demande de devis');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MobileLayout title="Demander un devis" showBackButton>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Sélectionnez les services pour lesquels vous souhaitez recevoir un devis. 
            Notre équipe vous répondra dans les 24 heures.
          </p>
          
          {selectedServices.length > 0 && (
            <div className="bg-taxi-yellow/10 border border-taxi-yellow rounded-md p-3 mb-4">
              <p className="text-sm font-medium">
                {selectedServices.length} {selectedServices.length > 1 ? 'services sélectionnés' : 'service sélectionné'}
              </p>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Chargement des services...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-3">{category}</h3>
                <div className="space-y-3">
                  {categoryServices.map(service => (
                    <Card 
                      key={service.id}
                      className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                        selectedServices.includes(service.id) ? 'border-taxi-yellow bg-taxi-yellow/10' : ''
                      }`}
                      onClick={() => handleToggleService(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                {service.estimatedTime}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {selectedServices.includes(service.id) ? (
                              <div className="bg-taxi-yellow rounded-full p-1">
                                <Check className="h-5 w-5 text-white" />
                              </div>
                            ) : (
                              <div className="rounded-full p-1 border border-muted-foreground">
                                <Plus className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Commentaires additionnels</h3>
          <Textarea 
            placeholder="Indiquez ici toute information complémentaire concernant votre demande de devis..."
            className="mb-4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        
        <Separator className="my-6" />
        
        <Button 
          className="w-full bg-taxi-blue text-white hover:bg-taxi-blue/90 flex items-center justify-center"
          onClick={handleSubmit}
          disabled={isSubmitting || selectedServices.length === 0}
        >
          <FileText className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Envoi en cours...' : 'Demander un devis'}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default RequestQuote;
