
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAppointments } from '@/contexts/AppointmentContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useCenters } from '@/contexts/CenterContext';
import { cn } from '@/lib/utils';

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, updateAppointment, deleteAppointment } = useAppointments();
  const { vehicles } = useVehicles();
  const { centers } = useCenters();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const appointment = appointments.find(apt => apt.id === id);
  
  const vehicle = vehicles.find(v => v.id === appointment?.vehicleId);
  const center = centers.find(c => c.id === appointment?.centerId);
  
  if (!appointment) {
    return (
      <MobileLayout title="Détails du rendez-vous" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Rendez-vous introuvable</p>
          <Button 
            onClick={() => navigate('/appointments')}
            className="mt-4"
          >
            Retour aux rendez-vous
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  const handleCancel = async () => {
    setIsLoading(true);
    
    try {
      await updateAppointment({
        ...appointment,
        status: 'cancelled'
      });
      
      toast.success('Rendez-vous annulé');
      setShowCancelDialog(false);
      navigate('/appointments');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de l\'annulation du rendez-vous');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            <Clock size={16} className="mr-2" />
            En attente
          </div>
        );
      case 'confirmed':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle size={16} className="mr-2" />
            Confirmé
          </div>
        );
      case 'cancelled':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle size={16} className="mr-2" />
            Annulé
          </div>
        );
      case 'completed':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <CheckCircle size={16} className="mr-2" />
            Complété
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <MobileLayout title="Détails du rendez-vous" showBackButton>
      <div className="p-4">
        <div className="mb-6 text-center">
          {getStatusBadge()}
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Date et heure</p>
                <p className="font-medium">{appointment.date} à {appointment.time}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Centre</p>
                <p className="font-medium">{center?.name}</p>
                <p className="text-sm text-gray-600">{center?.address}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Car className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Véhicule</p>
                <p className="font-medium">{vehicle?.make} {vehicle?.model} {vehicle?.year}</p>
                <p className="text-sm text-gray-600">Plaque: {vehicle?.licensePlate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Type de service</h3>
            <p className="capitalize">{appointment.serviceType}</p>
            
            <Separator className="my-3" />
            
            <h3 className="font-medium mb-2">Référence</h3>
            <p className="font-mono">#{appointment.id.substring(0, 8)}</p>
          </CardContent>
        </Card>
        
        {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <XCircle className="mr-2 h-4 w-4" />
                Annuler le rendez-vous
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Annuler le rendez-vous</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir annuler ce rendez-vous? Cette action ne peut pas être annulée.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  Retour
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Annulation en cours..." : "Confirmer l'annulation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MobileLayout>
  );
};

export default AppointmentDetails;
