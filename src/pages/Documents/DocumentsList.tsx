
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { File, FileText, Calendar, Search, AlertCircle, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';

const DocumentsList = () => {
  const { vehicles } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Collect all documents from all vehicles
  const allDocuments = vehicles.flatMap(vehicle => 
    vehicle.documents.map(doc => ({
      ...doc,
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.make} ${vehicle.model}`,
      licensePlate: vehicle.licensePlate
    }))
  );
  
  // Filter documents based on search term
  const filteredDocuments = allDocuments.filter(doc => 
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group documents by expiry status
  const currentDate = new Date();
  const expiredDocuments = filteredDocuments.filter(doc => 
    doc.expiryDate && new Date(doc.expiryDate) < currentDate
  );
  
  const validDocuments = filteredDocuments.filter(doc => 
    !doc.expiryDate || new Date(doc.expiryDate) >= currentDate
  );
  
  return (
    <MobileLayout title="Mes Documents">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dossiers & Documents</h2>
          <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
            <Link to="/documents/scan">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouveau
            </Link>
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Rechercher un document..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="valid" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="valid">Valides</TabsTrigger>
            <TabsTrigger value="expired">Expirés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="valid">
            {validDocuments.length > 0 ? (
              <div className="space-y-3">
                {validDocuments.map((doc, index) => (
                  <Card key={index} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{doc.type}</p>
                          <p className="text-sm text-gray-600">{doc.vehicleName}</p>
                          <p className="text-sm text-gray-600">{doc.licensePlate}</p>
                          {doc.expiryDate && (
                            <div className="flex items-center mt-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Expire: {new Date(doc.expiryDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <FileText className="h-8 w-8 text-taxi-blue flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                {searchTerm ? (
                  <p className="text-muted-foreground">Aucun document valide trouvé</p>
                ) : (
                  <p className="text-muted-foreground">Aucun document valide</p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired">
            {expiredDocuments.length > 0 ? (
              <div className="space-y-3">
                {expiredDocuments.map((doc, index) => (
                  <Card key={index} className="border-red-200 bg-red-50 hover:bg-red-100/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{doc.type}</p>
                            <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100/80">Expiré</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{doc.vehicleName}</p>
                          <p className="text-sm text-gray-600">{doc.licensePlate}</p>
                          {doc.expiryDate && (
                            <div className="flex items-center mt-1 text-sm text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Expiré le: {new Date(doc.expiryDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun document expiré</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Card className="bg-amber-50 border-amber-200 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Rappel important</h3>
                <p className="text-sm text-gray-600">
                  Assurez-vous de garder vos documents à jour. Les documents expirés peuvent entraîner des amendes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button asChild variant="outline" className="w-full">
          <Link to="/documents/scan">
            Scanner un nouveau document
          </Link>
        </Button>
      </div>
    </MobileLayout>
  );
};

export default DocumentsList;
