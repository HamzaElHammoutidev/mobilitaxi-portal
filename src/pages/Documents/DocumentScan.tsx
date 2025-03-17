import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, File, X, Check, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useVehicles } from '@/contexts/VehicleContext';

const DocumentScan = () => {
  const navigate = useNavigate();
  const { vehicles, folders, uploadDocument } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [documentType, setDocumentType] = useState('Registration');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const documentTypes = [
    'Registration', 
    'Insurance', 
    'License', 
    'Maintenance Record',
    'Technical Control'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleUpload = async () => {
    if (!selectedVehicle) {
      toast.error('Veuillez sélectionner un véhicule');
      return;
    }
    
    if (!documentType) {
      toast.error('Veuillez sélectionner un type de document');
      return;
    }
    
    if (!file) {
      toast.error('Veuillez scanner ou télécharger un document');
      return;
    }
    
    setIsUploading(true);
    
    try {
      await uploadDocument(selectedVehicle, documentType, file, selectedFolder || undefined);
      toast.success('Document téléchargé avec succès');
      setTimeout(() => {
        navigate(`/vehicles/${selectedVehicle}`);
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du téléchargement du document');
    } finally {
      setIsUploading(false);
    }
  };
  
  const clearPreview = () => {
    setFile(null);
    setPreviewUrl(null);
  };
  
  return (
    <MobileLayout title="Scanner un document" showBackButton>
      <div className="p-4">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="vehicle" className="text-base font-medium block mb-2">
                Sélectionnez un véhicule
              </Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="docType" className="text-base font-medium block mb-2">
                Type de document
              </Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type de document" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="folder" className="text-base font-medium block mb-2">
                Dossier (optionnel)
              </Label>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un dossier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="no-folder" value="none">
                    Aucun dossier
                  </SelectItem>
                  {folders.map(folder => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">Caméra</TabsTrigger>
              <TabsTrigger value="upload">Charger</TabsTrigger>
            </TabsList>
            
            <TabsContent value="camera" className="py-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Document preview" className="w-full rounded-lg border border-gray-300" />
                  <button 
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
                    onClick={clearPreview}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <Card className="border-dashed border-2">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Camera className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center mb-4">Prenez une photo du document</p>
                    <Button 
                      onClick={handleCameraCapture} 
                      className="bg-taxi-blue hover:bg-taxi-blue/90"
                    >
                      Scanner le document
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      capture="environment"
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="upload" className="py-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Document preview" className="w-full rounded-lg border border-gray-300" />
                  <button 
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white"
                    onClick={clearPreview}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <Card className="border-dashed border-2">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <Upload className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center mb-4">Chargez un fichier depuis votre appareil</p>
                    <Button 
                      onClick={() => fileInputRef.current?.click()} 
                      className="bg-taxi-blue hover:bg-taxi-blue/90"
                    >
                      Charger un fichier
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {previewUrl && (
            <Button 
              className="w-full bg-taxi-yellow hover:bg-taxi-yellow/90 text-black"
              disabled={isUploading}
              onClick={handleUpload}
            >
              {isUploading ? 'Téléchargement...' : 'Télécharger le document'}
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default DocumentScan;
