
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  services: string[];
  centerLocation: string;
  vehicleId: string;
  centerId: string; // Added missing field
  serviceType: string; // Added missing field
}

interface CreateAppointmentData {
  vehicleId: string;
  centerId: string;
  date: string;
  time: string;
  serviceType: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  requestAppointment: (date: string, time: string, services: string[], vehicleId: string) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  getAppointmentById: (id: string) => Appointment | undefined;
  updateAppointment: (appointment: Appointment) => Promise<void>; // Added missing function
  deleteAppointment: (id: string) => Promise<void>; // Added missing function
  createAppointment: (data: CreateAppointmentData) => Promise<void>; // Added missing function
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem('taxiAppointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      // Mock data for demo
      const mockAppointments: Appointment[] = [
        {
          id: 'apt1',
          date: '2023-11-15',
          time: '10:00',
          status: 'confirmed',
          services: ['Inspection annuelle', 'Changement d\'huile'],
          centerLocation: 'Centre du Taxi - Montréal Est',
          vehicleId: 'v1',
          centerId: 'center1', // Added missing field
          serviceType: 'inspection' // Added missing field
        },
        {
          id: 'apt2',
          date: '2023-12-03',
          time: '14:30',
          status: 'pending',
          services: ['Réparation du taximètre', 'Vérification des freins'],
          centerLocation: 'Centre du Taxi - Laval',
          vehicleId: 'v2',
          centerId: 'center2', // Added missing field
          serviceType: 'repair' // Added missing field
        }
      ];
      
      localStorage.setItem('taxiAppointments', JSON.stringify(mockAppointments));
      setAppointments(mockAppointments);
    }
    setLoading(false);
  }, []);

  const requestAppointment = async (
    date: string, 
    time: string, 
    services: string[], 
    vehicleId: string
  ) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        id: `apt${Date.now()}`,
        date,
        time,
        status: 'pending',
        services,
        centerLocation: 'Centre du Taxi - Montréal Centre',
        vehicleId,
        centerId: 'center1', // Added missing field
        serviceType: 'inspection' // Added missing field
      };
      
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      localStorage.setItem('taxiAppointments', JSON.stringify(updatedAppointments));
      
      toast.success('Demande de rendez-vous envoyée. Vous recevrez une confirmation par téléphone.');
    } catch (error) {
      toast.error('Échec de la demande de rendez-vous');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAppointments = appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      
      setAppointments(updatedAppointments);
      localStorage.setItem('taxiAppointments', JSON.stringify(updatedAppointments));
      
      toast.success('Rendez-vous annulé');
    } catch (error) {
      toast.error('Échec de l\'annulation');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Added missing functions
  const updateAppointment = async (appointment: Appointment) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAppointments = appointments.map(apt => 
        apt.id === appointment.id ? appointment : apt
      );
      
      setAppointments(updatedAppointments);
      localStorage.setItem('taxiAppointments', JSON.stringify(updatedAppointments));
      
      toast.success('Rendez-vous mis à jour');
    } catch (error) {
      toast.error('Échec de la mise à jour');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAppointments = appointments.filter(apt => apt.id !== id);
      
      setAppointments(updatedAppointments);
      localStorage.setItem('taxiAppointments', JSON.stringify(updatedAppointments));
      
      toast.success('Rendez-vous supprimé');
    } catch (error) {
      toast.error('Échec de la suppression');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (data: CreateAppointmentData) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const center = data.centerId === 'center1' ? 'Centre du Taxi - Montréal Est' : 'Centre du Taxi - Laval';
      
      const newAppointment: Appointment = {
        id: `apt${Date.now()}`,
        date: data.date,
        time: data.time,
        status: data.status,
        services: [],
        centerLocation: center,
        vehicleId: data.vehicleId,
        centerId: data.centerId,
        serviceType: data.serviceType
      };
      
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      localStorage.setItem('taxiAppointments', JSON.stringify(updatedAppointments));
      
      toast.success('Rendez-vous créé avec succès');
    } catch (error) {
      toast.error('Échec de la création du rendez-vous');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentById = (id: string) => {
    return appointments.find(apt => apt.id === id);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        requestAppointment,
        cancelAppointment,
        getAppointmentById,
        updateAppointment, // Added
        deleteAppointment, // Added
        createAppointment // Added
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
