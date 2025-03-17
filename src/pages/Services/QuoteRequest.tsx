
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import BottomNavbar from '@/components/layout/BottomNavbar';
import { useVehicles } from '@/contexts/VehicleContext';
import { useServices, Service } from '@/contexts/ServiceContext';

const QuoteRequest = () => {
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  const { services, requestQuote } = useServices();
  
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };
  
  const calculateTotal = () => {
    return services
      .filter(service => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + (service.price || 0), 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle) {
      toast.error('Veuillez sélectionner un véhicule');
      return;
    }
    
    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await requestQuote(selectedVehicle, selectedServices);
      toast.success('Votre demande de devis a été envoyée');
      navigate('/services/list');
    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la demande de devis');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);
  
  return (
    <MobileLayout title="Demander un devis" showBackButton>
      <div className="p-4 pb-20">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Vehicle selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Sélectionnez un véhicule</Label>
              <div className="grid grid-cols-1 gap-3">
                {vehicles.length > 0 ? (
                  <RadioGroup value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    {vehicles.map(vehicle => (
                      <Card 
                        key={vehicle.id} 
                        className={`hover:bg-muted/50 cursor-pointer transition-colors ${selectedVehicle === vehicle.id ? 'border-taxi-yellow bg-taxi-yellow/10' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <RadioGroupItem value={vehicle.id} id={vehicle.id} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={vehicle.id} className="font-medium cursor-pointer">
                                {vehicle.make} {vehicle.model} {vehicle.year}
                              </Label>
                              <p className="text-sm text-gray-600">Plaque: {vehicle.licensePlate}</p>
                            </div>
                            <Car className="h-6 w-6 text-taxi-yellow" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </RadioGroup>
                ) : (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-muted-foreground">Aucun véhicule disponible</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Vos véhicules seront associés lors de votre prochaine visite à un centre.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Services selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Sélectionnez les services souhaités</Label>
              <div className="space-y-6">
                {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">{category}</h3>
                    <div className="space-y-2">
                      {categoryServices.map(service => (
                        <Card 
                          key={service.id} 
                          className={`hover:bg-muted/50 cursor-pointer transition-colors ${selectedServices.includes(service.id) ? 'border-taxi-yellow bg-taxi-yellow/10' : ''}`}
                          onClick={() => handleServiceToggle(service.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <div className="flex h-5 items-center mr-3 mt-1">
                                <Checkbox 
                                  id={`service-${service.id}`}
                                  checked={selectedServices.includes(service.id)}
                                  onCheckedChange={() => {}}
                                />
                              </div>
                              <div className="flex-1">
                                <Label 
                                  htmlFor={`service-${service.id}`} 
                                  className="font-medium cursor-pointer"
                                >
                                  {service.name}
                                </Label>
                                <p className="text-sm text-gray-600">{service.description}</p>
                                <div className="flex mt-2 space-x-3">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {service.estimatedTime}
                                  </span>
                                  {service.price ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {service.price.toFixed(2)} €
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                      Prix sur demande
                                    </span>
                                  )}
                                </div>
                              </div>
                              {selectedServices.includes(service.id) && (
                                <Check className="h-5 w-5 text-green-600 ml-2" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Total estimate */}
            {selectedServices.length > 0 && (
              <Card className="bg-taxi-yellow/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total estimé:</p>
                      <p className="text-sm text-gray-600">
                        {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <p className="text-xl font-bold">{calculateTotal().toFixed(2)} €</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
              disabled={isLoading || selectedServices.length === 0 || !selectedVehicle}
            >
              {isLoading ? "Envoi en cours..." : "Demander un devis"}
            </Button>
          </div>
        </form>
      </div>
      
      <BottomNavbar />
    </MobileLayout>
  );
};

export default QuoteRequest;
