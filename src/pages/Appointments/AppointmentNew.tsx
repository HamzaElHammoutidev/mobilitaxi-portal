
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';
import { useCenters } from '@/contexts/CenterContext';
import { useAppointments } from '@/contexts/AppointmentContext';

const AppointmentNew = () => {
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  const { centers } = useCenters();
  const { createAppointment } = useAppointments();
  
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('inspection');
  const [isLoading, setIsLoading] = useState(false);
  
  const availableDates = [
    '2024-07-01',
    '2024-07-02',
    '2024-07-03',
    '2024-07-05',
    '2024-07-08'
  ];
  
  const availableTimes = [
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00'
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVehicle || !selectedCenter || !selectedDate || !selectedTime) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await createAppointment({
        vehicleId: selectedVehicle,
        centerId: selectedCenter,
        date: selectedDate,
        time: selectedTime,
        serviceType: serviceType,
        status: 'pending'
      });
      
      toast.success('Rendez-vous créé avec succès');
      navigate('/appointments');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la création du rendez-vous');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MobileLayout title="Nouveau rendez-vous" showBackButton>
      <div className="p-4">
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
            
            {/* Center selection */}
            <div className="space-y-2">
              <Label htmlFor="center" className="text-base font-medium">Centre de service</Label>
              <Select value={selectedCenter} onValueChange={setSelectedCenter}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un centre" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map(center => (
                    <SelectItem key={center.id} value={center.id}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Service type */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Type de service</Label>
              <RadioGroup value={serviceType} onValueChange={setServiceType} className="grid grid-cols-2 gap-3">
                <Card className={`hover:bg-muted/50 cursor-pointer transition-colors ${serviceType === 'inspection' ? 'border-taxi-yellow bg-taxi-yellow/10' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="inspection" id="inspection" className="mt-1" />
                      <Label htmlFor="inspection" className="font-medium cursor-pointer">
                        Inspection
                      </Label>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`hover:bg-muted/50 cursor-pointer transition-colors ${serviceType === 'repair' ? 'border-taxi-yellow bg-taxi-yellow/10' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value="repair" id="repair" className="mt-1" />
                      <Label htmlFor="repair" className="font-medium cursor-pointer">
                        Réparation
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>
            
            {/* Date selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Date du rendez-vous</Label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {availableDates.map(date => (
                  <Button
                    key={date}
                    type="button"
                    variant={selectedDate === date ? "default" : "outline"}
                    className={selectedDate === date ? "bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" : ""}
                    onClick={() => setSelectedDate(date)}
                  >
                    {new Date(date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Time selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Heure du rendez-vous</Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map(time => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className={selectedTime === time ? "bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "Confirmer le rendez-vous"}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
};

export default AppointmentNew;
