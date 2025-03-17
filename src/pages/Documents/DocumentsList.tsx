
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { File, FileText, Calendar, Search, AlertCircle, PlusCircle, FolderPlus, Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles, Document, DocumentFolder } from '@/contexts/VehicleContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DocumentWithVehicle extends Document {
  vehicleId: string;
  vehicleName: string;
  licensePlate: string;
}

const DocumentsList = () => {
  const { vehicles, folders, addFolder, updateFolder, deleteFolder } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | 'all'>('all');
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<DocumentFolder | null>(null);
  
  // Collect all documents from all vehicles
  const allDocuments: DocumentWithVehicle[] = vehicles.flatMap(vehicle => 
    vehicle.documents.map(doc => ({
      ...doc,
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.make} ${vehicle.model}`,
      licensePlate: vehicle.licensePlate
    }))
  );
  
  // Filter documents based on search term and selected folder
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = 
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFolder = selectedFolderId === 'all' || doc.folderId === selectedFolderId;
    
    return matchesSearch && matchesFolder;
  });
  
  // Group documents by expiry status
  const currentDate = new Date();
  const expiredDocuments = filteredDocuments.filter(doc => 
    doc.expiryDate && new Date(doc.expiryDate) < currentDate
  );
  
  const validDocuments = filteredDocuments.filter(doc => 
    !doc.expiryDate || new Date(doc.expiryDate) >= currentDate
  );
  
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('Veuillez entrer un nom de dossier');
      return;
    }
    
    addFolder(newFolderName.trim());
    setNewFolderName('');
  };
  
  const handleUpdateFolder = () => {
    if (!editingFolder || !editingFolder.name.trim()) {
      toast.error('Veuillez entrer un nom de dossier');
      return;
    }
    
    updateFolder(editingFolder.id, editingFolder.name.trim(), editingFolder.icon, editingFolder.color);
    setEditingFolder(null);
  };
  
  const handleDeleteFolder = (folderId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce dossier ? Les documents ne seront pas supprimés.')) {
      deleteFolder(folderId);
    }
  };
  
  return (
    <MobileLayout title="Mes Documents">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dossiers & Documents</h2>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <FolderPlus className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Gestion des dossiers</SheetTitle>
                  <SheetDescription>
                    Créez, modifiez ou supprimez des dossiers pour organiser vos documents.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-folder">Nouveau dossier</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="new-folder" 
                        placeholder="Nom du dossier" 
                        value={newFolderName} 
                        onChange={(e) => setNewFolderName(e.target.value)} 
                      />
                      <Button onClick={handleCreateFolder}>Créer</Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Dossiers existants</h3>
                    {folders.length > 0 ? (
                      <div className="space-y-2">
                        {folders.map((folder) => (
                          <div key={folder.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Folder className="h-4 w-4" />
                              <span>{folder.name}</span>
                            </div>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 px-2">Éditer</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Modifier le dossier</DialogTitle>
                                    <DialogDescription>
                                      Modifiez les informations du dossier.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="folder-name">Nom du dossier</Label>
                                      <Input 
                                        id="folder-name" 
                                        value={editingFolder?.name || ''} 
                                        onChange={(e) => setEditingFolder(prev => prev ? {...prev, name: e.target.value} : null)} 
                                        autoFocus 
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setEditingFolder(null)}>Annuler</Button>
                                    <Button onClick={handleUpdateFolder}>Enregistrer</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleDeleteFolder(folder.id)}
                              >
                                Supprimer
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Aucun dossier disponible</p>
                    )}
                  </div>
                </div>
                
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button variant="secondary">Fermer</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            
            <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
              <Link to="/documents/scan">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouveau
              </Link>
            </Button>
          </div>
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
        
        {/* Folder selection */}
        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <Button 
              variant={selectedFolderId === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedFolderId('all')}
              className="whitespace-nowrap"
            >
              Tous les documents
            </Button>
            
            {folders.map(folder => (
              <Button 
                key={folder.id}
                variant={selectedFolderId === folder.id ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedFolderId(folder.id)}
                className="whitespace-nowrap"
              >
                <Folder className="h-4 w-4 mr-2" />
                {folder.name}
              </Button>
            ))}
          </div>
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
                          {/* Display folder if assigned */}
                          {doc.folderId && (
                            <Badge variant="outline" className="mt-2">
                              <Folder className="h-3 w-3 mr-1" />
                              {folders.find(f => f.id === doc.folderId)?.name || 'Dossier'}
                            </Badge>
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
                          {/* Display folder if assigned */}
                          {doc.folderId && (
                            <Badge variant="outline" className="mt-2">
                              <Folder className="h-3 w-3 mr-1" />
                              {folders.find(f => f.id === doc.folderId)?.name || 'Dossier'}
                            </Badge>
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
