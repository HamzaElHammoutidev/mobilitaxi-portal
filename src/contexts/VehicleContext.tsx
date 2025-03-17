import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Document {
  id: string;
  type: string;
  url: string;
  expiryDate?: string;
  folderId?: string;
  dateAdded: string;
}

export interface DocumentFolder {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: 'active' | 'inactive' | 'pending';
  lastService: string;
  nextServiceDue: string;
  documents: Document[];
}

interface VehicleContextType {
  vehicles: Vehicle[];
  folders: DocumentFolder[];
  loading: boolean;
  getVehicleById: (id: string) => Vehicle | undefined;
  uploadDocument: (vehicleId: string, type: string, file: File, folderId?: string) => Promise<void>;
  addFolder: (name: string, icon?: string, color?: string) => Promise<void>;
  updateFolder: (id: string, name: string, icon?: string, color?: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  moveDocumentToFolder: (vehicleId: string, documentId: string, folderId: string | null) => Promise<void>;
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
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVehicles = localStorage.getItem('taxiVehicles');
    const storedFolders = localStorage.getItem('taxiDocumentFolders');
    
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    } else {
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
              id: 'd1',
              type: 'Registration',
              url: '/registration.pdf',
              expiryDate: '2024-06-30',
              dateAdded: '2023-06-30'
            },
            {
              id: 'd2',
              type: 'Insurance',
              url: '/insurance.pdf',
              expiryDate: '2024-01-15',
              dateAdded: '2023-01-15'
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
              id: 'd3',
              type: 'Registration',
              url: '/registration2.pdf',
              expiryDate: '2024-05-12',
              dateAdded: '2023-05-12'
            },
            {
              id: 'd4',
              type: 'Insurance',
              url: '/insurance2.pdf',
              expiryDate: '2024-02-28',
              dateAdded: '2023-02-28'
            }
          ]
        }
      ];
      
      localStorage.setItem('taxiVehicles', JSON.stringify(mockVehicles));
      setVehicles(mockVehicles);
    }
    
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    } else {
      const defaultFolders: DocumentFolder[] = [
        { id: 'f1', name: 'Documents administratifs', icon: 'FileText', color: '#3498db' },
        { id: 'f2', name: 'Assurances', icon: 'Shield', color: '#2ecc71' },
        { id: 'f3', name: 'Contrôle technique', icon: 'CheckSquare', color: '#e74c3c' },
        { id: 'f4', name: 'Entretien', icon: 'Tool', color: '#f39c12' }
      ];
      
      localStorage.setItem('taxiDocumentFolders', JSON.stringify(defaultFolders));
      setFolders(defaultFolders);
    }
    
    setLoading(false);
  }, []);

  const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
  };

  const uploadDocument = async (vehicleId: string, type: string, file: File, folderId?: string) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const documentUrl = `/docs/${type.toLowerCase()}_${Date.now()}.pdf`;
      const documentId = `d${Date.now()}`;
      
      const updatedVehicles = vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          const updatedDocuments = [
            ...vehicle.documents.filter(doc => doc.type !== type),
            {
              id: documentId,
              type,
              url: documentUrl,
              folderId: folderId && folderId !== 'none' ? folderId : undefined,
              dateAdded: new Date().toISOString().split('T')[0],
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
  
  const addFolder = async (name: string, icon?: string, color?: string) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newFolder: DocumentFolder = {
        id: `f${Date.now()}`,
        name,
        icon,
        color
      };
      
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      localStorage.setItem('taxiDocumentFolders', JSON.stringify(updatedFolders));
      
      toast.success(`Dossier "${name}" créé avec succès`);
    } catch (error) {
      toast.error('Échec de la création du dossier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateFolder = async (id: string, name: string, icon?: string, color?: string) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFolders = folders.map(folder => {
        if (folder.id === id) {
          return {
            ...folder,
            name,
            icon,
            color
          };
        }
        return folder;
      });
      
      setFolders(updatedFolders);
      localStorage.setItem('taxiDocumentFolders', JSON.stringify(updatedFolders));
      
      toast.success(`Dossier "${name}" mis à jour avec succès`);
    } catch (error) {
      toast.error('Échec de la mise à jour du dossier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteFolder = async (id: string) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFolders = folders.filter(folder => folder.id !== id);
      setFolders(updatedFolders);
      localStorage.setItem('taxiDocumentFolders', JSON.stringify(updatedFolders));
      
      const updatedVehicles = vehicles.map(vehicle => {
        const updatedDocuments = vehicle.documents.map(doc => {
          if (doc.folderId === id) {
            return { ...doc, folderId: undefined };
          }
          return doc;
        });
        
        return { ...vehicle, documents: updatedDocuments };
      });
      
      setVehicles(updatedVehicles);
      localStorage.setItem('taxiVehicles', JSON.stringify(updatedVehicles));
      
      toast.success(`Dossier supprimé avec succès`);
    } catch (error) {
      toast.error('Échec de la suppression du dossier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const moveDocumentToFolder = async (vehicleId: string, documentId: string, folderId: string | null) => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedVehicles = vehicles.map(vehicle => {
        if (vehicle.id === vehicleId) {
          const updatedDocuments = vehicle.documents.map(doc => {
            if (doc.id === documentId) {
              return { ...doc, folderId: folderId || undefined };
            }
            return doc;
          });
          
          return {
            ...vehicle,
            documents: updatedDocuments
          };
        }
        return vehicle;
      });
      
      setVehicles(updatedVehicles);
      localStorage.setItem('taxiVehicles', JSON.stringify(updatedVehicles));
      
      toast.success(folderId 
        ? `Document déplacé vers le dossier avec succès` 
        : `Document retiré du dossier avec succès`);
    } catch (error) {
      toast.error('Échec du déplacement du document');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        folders,
        loading,
        getVehicleById,
        uploadDocument,
        addFolder,
        updateFolder,
        deleteFolder,
        moveDocumentToFolder
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
