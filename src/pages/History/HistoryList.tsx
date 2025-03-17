
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, Car, Wrench, FileText, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { useServices } from '@/contexts/ServiceContext';

type HistoryEvent = {
  id: string;
  type: 'appointment' | 'service' | 'document';
  date: string;
  title: string;
  vehicleId: string;
  status: string;
  details?: string;
};

const HistoryList = () => {
  const location = useLocation();
  const { vehicles } = useVehicles();
  const { appointments } = useAppointments();
  const { services } = useServices();
  
  const [filter, setFilter] = useState<string>('all');
  const [vehicleFilter, setVehicleFilter] = useState<string>('all');

  // Extract vehicle ID from path if it's a vehicle-specific history
  const pathParts = location.pathname.split('/');
  const isVehicleSpecific = pathParts[1] === 'vehicles' && pathParts[2] === 'history';
  
  // Generate history events from different sources
  const generateHistoryEvents = (): HistoryEvent[] => {
    const events: HistoryEvent[] = [];
    
    // Add appointments to history
    appointments.forEach(appointment => {
      events.push({
        id: appointment.id,
        type: 'appointment',
        date: `${appointment.date} ${appointment.time}`,
        title: `Rendez-vous: ${appointment.serviceType === 'repair' ? 'Réparation' : 'Inspection'}`,
        vehicleId: appointment.vehicleId,
        status: appointment.status,
        details: `Centre: ${appointment.centerId}`
      });
    });
    
    // Add services as fictional past events
    services.forEach((service, index) => {
      // Randomly assign services to vehicles
      const randomVehicleIndex = index % vehicles.length;
      const vehicleId = vehicles[randomVehicleIndex]?.id || 'v1';
      
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - (index % 6) - 1);
      
      events.push({
        id: `service-${index}`,
        type: 'service',
        date: pastDate.toISOString().split('T')[0],
        title: service.name,
        vehicleId: vehicleId,
        status: 'completed',
        details: `Catégorie: ${service.category}`
      });
    });
    
    // Add document uploads to history
    vehicles.forEach(vehicle => {
      vehicle.documents.forEach((doc, docIndex) => {
        const pastDate = new Date();
        pastDate.setMonth(pastDate.getMonth() - (docIndex % 3) - 1);
        
        events.push({
          id: `doc-${vehicle.id}-${docIndex}`,
          type: 'document',
          date: pastDate.toISOString().split('T')[0],
          title: `Document ajouté: ${doc.type}`,
          vehicleId: vehicle.id,
          status: 'completed',
          details: doc.expiryDate ? `Expire le: ${doc.expiryDate}` : undefined
        });
      });
    });
    
    // Sort events by date (newest first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  const allEvents = generateHistoryEvents();
  
  // Apply filters
  const filteredEvents = allEvents.filter(event => {
    // Filter by vehicle if needed
    if (vehicleFilter !== 'all' && event.vehicleId !== vehicleFilter) {
      return false;
    }
    
    // Filter by event type
    if (filter !== 'all' && event.type !== filter) {
      return false;
    }
    
    return true;
  });
  
  // Get vehicle info
  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model}` : 'Véhicule inconnu';
  };
  
  // Get icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-8 w-8 text-taxi-blue" />;
      case 'service':
        return <Wrench className="h-8 w-8 text-green-600" />;
      case 'document':
        return <FileText className="h-8 w-8 text-amber-500" />;
      default:
        return <Clock className="h-8 w-8 text-gray-500" />;
    }
  };
  
  return (
    <MobileLayout 
      title={isVehicleSpecific ? "Historique du véhicule" : "Historique"}
      showBackButton
    >
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Historique</h2>
          <p className="text-gray-600 text-sm">
            {filteredEvents.length} événements enregistrés
          </p>
        </div>
        
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Filtres</span>
          </div>
          
          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par véhicule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les véhicules</SelectItem>
              {vehicles.map(vehicle => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="appointment">Rendez-vous</TabsTrigger>
              <TabsTrigger value="service">Services</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                      <p className="text-sm text-gray-600">{getVehicleInfo(event.vehicleId)}</p>
                      {event.details && (
                        <p className="text-sm text-gray-600">{event.details}</p>
                      )}
                      <div className="mt-1">
                        {event.status === 'pending' ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En attente</Badge>
                        ) : event.status === 'completed' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complété</Badge>
                        ) : event.status === 'cancelled' ? (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Annulé</Badge>
                        ) : (
                          <Badge variant="outline">{event.status}</Badge>
                        )}
                      </div>
                    </div>
                    {getEventIcon(event.type)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Aucun événement trouvé</p>
            {filter !== 'all' && (
              <Button 
                variant="outline" 
                onClick={() => { setFilter('all'); setVehicleFilter('all'); }}
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default HistoryList;
