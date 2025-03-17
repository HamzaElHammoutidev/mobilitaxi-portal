
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RepairCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface CenterContextType {
  centers: RepairCenter[];
  loading: boolean;
  getCenterById: (id: string) => RepairCenter | undefined;
}

const CenterContext = createContext<CenterContextType | undefined>(undefined);

export const useCenters = () => {
  const context = useContext(CenterContext);
  if (context === undefined) {
    throw new Error('useCenters must be used within a CenterProvider');
  }
  return context;
};

interface CenterProviderProps {
  children: ReactNode;
}

export const CenterProvider: React.FC<CenterProviderProps> = ({ children }) => {
  const [centers, setCenters] = useState<RepairCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load centers from localStorage or initialize with mock data
    const storedCenters = localStorage.getItem('taxiCenters');
    if (storedCenters) {
      setCenters(JSON.parse(storedCenters));
    } else {
      // Mock center data
      const mockCenters: RepairCenter[] = [
        {
          id: 'c1',
          name: 'Centre du Taxi - Montréal Est',
          address: '5417 Rue Sherbrooke Est',
          city: 'Montréal',
          postalCode: 'H1N 1C2',
          phone: '514-555-1234',
          email: 'montreal-est@centretaxi.com',
          hours: [
            { day: 'Lundi', open: '08:00', close: '17:00' },
            { day: 'Mardi', open: '08:00', close: '17:00' },
            { day: 'Mercredi', open: '08:00', close: '17:00' },
            { day: 'Jeudi', open: '08:00', close: '17:00' },
            { day: 'Vendredi', open: '08:00', close: '17:00' },
            { day: 'Samedi', open: '09:00', close: '14:00' },
            { day: 'Dimanche', open: 'Fermé', close: 'Fermé' }
          ],
          services: ['s1', 's2', 's3', 's4', 's5'],
          coordinates: {
            lat: 45.562137,
            lng: -73.552302
          }
        },
        {
          id: 'c2',
          name: 'Centre du Taxi - Laval',
          address: '1555 Boulevard Le Corbusier',
          city: 'Laval',
          postalCode: 'H7S 1Z3',
          phone: '450-555-2345',
          email: 'laval@centretaxi.com',
          hours: [
            { day: 'Lundi', open: '08:00', close: '17:00' },
            { day: 'Mardi', open: '08:00', close: '17:00' },
            { day: 'Mercredi', open: '08:00', close: '17:00' },
            { day: 'Jeudi', open: '08:00', close: '17:00' },
            { day: 'Vendredi', open: '08:00', close: '17:00' },
            { day: 'Samedi', open: '09:00', close: '14:00' },
            { day: 'Dimanche', open: 'Fermé', close: 'Fermé' }
          ],
          services: ['s1', 's2', 's4'],
          coordinates: {
            lat: 45.560679,
            lng: -73.728524
          }
        },
        {
          id: 'c3',
          name: 'Centre du Taxi - Montréal Centre',
          address: '3737 Boulevard Crémazie Est',
          city: 'Montréal',
          postalCode: 'H1Z 2K4',
          phone: '514-555-3456',
          email: 'montreal-centre@centretaxi.com',
          hours: [
            { day: 'Lundi', open: '07:00', close: '19:00' },
            { day: 'Mardi', open: '07:00', close: '19:00' },
            { day: 'Mercredi', open: '07:00', close: '19:00' },
            { day: 'Jeudi', open: '07:00', close: '19:00' },
            { day: 'Vendredi', open: '07:00', close: '19:00' },
            { day: 'Samedi', open: '08:00', close: '16:00' },
            { day: 'Dimanche', open: '10:00', close: '14:00' }
          ],
          services: ['s1', 's2', 's3', 's4', 's5'],
          coordinates: {
            lat: 45.548656,
            lng: -73.602364
          }
        }
      ];
      
      localStorage.setItem('taxiCenters', JSON.stringify(mockCenters));
      setCenters(mockCenters);
    }
    
    setLoading(false);
  }, []);

  const getCenterById = (id: string) => {
    return centers.find(c => c.id === id);
  };

  return (
    <CenterContext.Provider
      value={{
        centers,
        loading,
        getCenterById
      }}
    >
      {children}
    </CenterContext.Provider>
  );
};
