
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: 'active' | 'inactive' | 'pending';
  lastService: string;
  nextServiceDue: string;
  documents: {
    type: string;
    url: string;
    expiryDate?: string;
  }[];
}

interface VehicleContextType {
  vehicles: Vehicle[];
  loading: boolean;
  getVehicleById: (id: string) => Vehicle | undefined;
  uploadDocument: (vehicleId: string, type: string, file: File) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load vehicles from localStorage
    const storedVehicles = localStorage.getItem('taxiVehicles');
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    } else {
      // Mock data for demo
      const mockVehicles: Vehicle[] = [
        {
          id: 'v1',
          make: 'Toyota',
          model: 'Camry',
          year: 2019,
          licensePlate: 'T4X1-123',
          status: 'active',
          lastService: '2023-09-10',
          nextServiceDue: '2023-12-10',
          documents: [
            {
              type: 'Registration',
              url: '/registration.pdf',
              expiryDate: '2024-06-30'
            },
            {
              type: 'Insurance',
              url: '/insurance.pdf',
              expiryDate: '2024-01-15'
            }
          ]
        },
        {
          id: 'v2',
          make: 'Honda',
          model: 'Accord',
          year: 2020,
          licensePlate: 'T4X1-456',
          status: 'active',
          lastService: '2023-08-22',
          nextServiceDue: '2023-11-22',
          documents: [
            {
              type: 'Registration',
              url: '/registration2.pdf',
              expiryDate: '2024-05-12'
            },
            {
              type: 'Insurance',
              url: '/insurance2.pdf',
              expiryDate: '2024-02-28'
            }
          ]
        }
      ];
      
      localStorage.setItem('taxiVehicles', JSON.stringify(mockVehicles));
      setVehicles(mockVehicles);
    }
    setLoading(false);
  }, []);

  const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
  };

  const uploadDocument = async (vehicleId: string, type: string, file: File) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock document URL (in a real app, this would be a URL from your file storage)
      const documentUrl = `/docs/${type.toLowerCase()}_${Date.now()}.pdf`;
      
      // Update the vehicle with the new document
      const updatedVehicles = vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          const updatedDocuments = [
            ...vehicle.documents.filter(doc => doc.type !== type),
            {
              type,
              url: documentUrl,
              expiryDate: type === 'Registration' || type === 'Insurance' 
                ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
                : undefined
            }
          ];
          
          return {
            ...vehicle,
            documents: updatedDocuments
          };
        }
        return vehicle;
      });
      
      setVehicles(updatedVehicles);
      localStorage.setItem('taxiVehicles', JSON.stringify(updatedVehicles));
      
      toast.success(`Document ${type} téléchargé avec succès`);
    } catch (error) {
      toast.error('Échec du téléchargement du document');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        getVehicleById,
        uploadDocument
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
