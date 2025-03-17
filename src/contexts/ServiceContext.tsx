
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'Inspection' | 'Maintenance' | 'Repair' | 'Certification';
  estimatedDuration: number; // in minutes
  estimatedTime: string; // Added this field for displaying human-readable time
  price?: number;
}

export interface Quote {
  id: string;
  services: Service[];
  vehicleId?: string; // Made optional to match usage
  status: 'pending' | 'approved' | 'rejected';
  total: number;
  createdAt: string;
  validUntil?: string; // Made optional to match usage
  qrCode?: string;
}

interface ServiceContextType {
  services: Service[];
  quotes: Quote[];
  loading: boolean;
  getServiceById: (id: string) => Service | undefined;
  getQuoteById: (id: string) => Quote | undefined;
  requestQuote: (vehicleId: string, serviceIds: string[]) => Promise<void>;
  addQuote: (quote: Quote) => void; // Added this method
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load services from localStorage or initialize with mock data
    const storedServices = localStorage.getItem('taxiServices');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      // Mock service data
      const mockServices: Service[] = [
        {
          id: 's1',
          name: 'Inspection annuelle du taxi',
          description: 'Inspection complète requise pour la certification annuelle',
          category: 'Inspection',
          estimatedDuration: 90,
          estimatedTime: '1h 30min',
          price: 149.99
        },
        {
          id: 's2',
          name: 'Changement d\'huile et filtre',
          description: 'Service complet avec huile synthétique',
          category: 'Maintenance',
          estimatedDuration: 45,
          estimatedTime: '45min',
          price: 69.99
        },
        {
          id: 's3',
          name: 'Réparation du taximètre',
          description: 'Diagnostique et réparation du taximètre',
          category: 'Repair',
          estimatedDuration: 120,
          estimatedTime: '2h',
          price: 0 // Added a default price even if it's 0
        },
        {
          id: 's4',
          name: 'Calibration du compteur',
          description: 'Service de calibration précise des compteurs',
          category: 'Maintenance',
          estimatedDuration: 60,
          estimatedTime: '1h',
          price: 89.99
        },
        {
          id: 's5',
          name: 'Certification de véhicule adapté',
          description: 'Inspection et certification pour taxis adaptés',
          category: 'Certification',
          estimatedDuration: 180,
          estimatedTime: '3h',
          price: 299.99
        },
      ];
      
      localStorage.setItem('taxiServices', JSON.stringify(mockServices));
      setServices(mockServices);
    }
    
    // Load quotes from localStorage or initialize with mock data
    const storedQuotes = localStorage.getItem('taxiQuotes');
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes));
    } else {
      // Mock quote data with all required fields
      const mockQuotes: Quote[] = [
        {
          id: 'q1',
          services: [
            {
              id: 's1',
              name: 'Inspection annuelle du taxi',
              description: 'Inspection complète requise pour la certification annuelle',
              category: 'Inspection',
              estimatedDuration: 90,
              estimatedTime: '1h 30min',
              price: 149.99
            },
            {
              id: 's2',
              name: 'Changement d\'huile et filtre',
              description: 'Service complet avec huile synthétique',
              category: 'Maintenance',
              estimatedDuration: 45,
              estimatedTime: '45min',
              price: 69.99
            }
          ],
          vehicleId: 'v1',
          status: 'approved',
          total: 219.98,
          createdAt: '2023-10-15',
          validUntil: '2023-11-15',
          qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=quote-q1'
        },
        {
          id: 'q2',
          services: [
            {
              id: 's3',
              name: 'Réparation du taximètre',
              description: 'Diagnostique et réparation du taximètre',
              category: 'Repair',
              estimatedDuration: 120,
              estimatedTime: '2h',
              price: 0 // Added a default price
            }
          ],
          vehicleId: 'v2',
          status: 'pending',
          total: 0,
          createdAt: '2023-11-01',
          validUntil: '2023-12-01'
        }
      ];
      
      localStorage.setItem('taxiQuotes', JSON.stringify(mockQuotes));
      setQuotes(mockQuotes);
    }
    
    setLoading(false);
  }, []);

  const getServiceById = (id: string) => {
    return services.find(s => s.id === id);
  };

  const getQuoteById = (id: string) => {
    return quotes.find(q => q.id === id);
  };

  // Add the missing addQuote method
  const addQuote = (quote: Quote) => {
    const updatedQuotes = [...quotes, quote];
    setQuotes(updatedQuotes);
    localStorage.setItem('taxiQuotes', JSON.stringify(updatedQuotes));
  };

  const requestQuote = async (vehicleId: string, serviceIds: string[]) => {
    try {
      setLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const selectedServices = services.filter(s => serviceIds.includes(s.id));
      
      // Calculate total (if prices are available)
      const total = selectedServices.reduce((sum, service) => {
        return sum + (service.price || 0);
      }, 0);
      
      // Create new quote
      const newQuote: Quote = {
        id: `q${Date.now()}`,
        services: selectedServices,
        vehicleId,
        status: 'pending',
        total,
        createdAt: new Date().toISOString().split('T')[0],
        validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
      };
      
      const updatedQuotes = [...quotes, newQuote];
      setQuotes(updatedQuotes);
      localStorage.setItem('taxiQuotes', JSON.stringify(updatedQuotes));
      
      toast.success('Demande de devis envoyée avec succès');
    } catch (error) {
      toast.error('Échec de la demande de devis');
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        quotes,
        loading,
        getServiceById,
        getQuoteById,
        requestQuote,
        addQuote
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
