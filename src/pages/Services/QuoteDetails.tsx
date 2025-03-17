
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, Clock, Check, X, AlertTriangle, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';

const QuoteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  
  // Mock data for the quote
  const quote = {
    id: id || 'q1',
    reference: 'DEVIS-2024-001',
    date: '2024-06-18',
    validUntil: '2024-07-18',
    amount: 155.50,
    status: 'pending',
    items: [
      { description: 'Changement de freins', amount: 85.00 },
      { description: 'Huile moteur', amount: 45.50 },
      { description: 'Diagnostic', amount: 25.00 }
    ],
    vehicle: {
      make: 'Toyota',
      model: 'Prius',
      year: 2020,
      plate: 'AB-123-CD'
    },
    center: {
      name: 'Centre du Taxi - Montréal Est',
      address: '5417 Rue Sherbrooke Est, Montréal'
    }
  };
  
  if (!quote) {
    return (
      <MobileLayout title="Détails du devis" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Devis introuvable</p>
          <Button onClick={() => navigate('/services/quotes')} className="mt-4">
            Retour aux devis
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  const handleAccept = async () => {
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Devis accepté avec succès');
      setShowAcceptDialog(false);
      navigate('/services/quotes');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de l\'acceptation du devis');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReject = async () => {
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Devis refusé');
      setShowRejectDialog(false);
      navigate('/services/quotes');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors du refus du devis');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStatusBadge = () => {
    switch (quote.status) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            <Clock size={16} className="mr-2" />
            En attente
          </div>
        );
      case 'accepted':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <Check size={16} className="mr-2" />
            Accepté
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <X size={16} className="mr-2" />
            Refusé
          </div>
        );
      case 'expired':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            <Clock size={16} className="mr-2" />
            Expiré
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <MobileLayout title="Détails du devis" showBackButton>
      <div className="p-4">
        <div className="mb-6 text-center">
          {getStatusBadge()}
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Référence</p>
                <p className="font-medium">{quote.reference}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Date d'émission</p>
                <p className="font-medium">{quote.date}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Valable jusqu'au</p>
                <p className="font-medium">{quote.validUntil}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Détails</h3>
            
            {quote.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <p className="text-gray-700">{item.description}</p>
                <p className="font-medium">{item.amount.toFixed(2)} €</p>
              </div>
            ))}
            
            <Separator className="my-3" />
            
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Total HT</p>
              <p className="font-medium">{(quote.amount / 1.2).toFixed(2)} €</p>
            </div>
            
            <div className="flex justify-between py-2">
              <p className="text-gray-700">TVA (20%)</p>
              <p className="font-medium">{(quote.amount - quote.amount / 1.2).toFixed(2)} €</p>
            </div>
            
            <div className="flex justify-between py-2 font-bold">
              <p>Total</p>
              <p>{quote.amount.toFixed(2)} €</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Informations véhicule</h3>
            <p className="text-gray-700">{quote.vehicle.make} {quote.vehicle.model} {quote.vehicle.year}</p>
            <p className="text-gray-700">Plaque: {quote.vehicle.plate}</p>
            
            <Separator className="my-3" />
            
            <h3 className="font-medium mb-2">Centre de service</h3>
            <p className="text-gray-700">{quote.center.name}</p>
            <p className="text-gray-700">{quote.center.address}</p>
          </CardContent>
        </Card>
        
        {quote.status === 'pending' && (
          <div className="flex gap-3">
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <X className="mr-2 h-4 w-4" />
                  Refuser
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Refuser le devis</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir refuser ce devis ? Cette action ne peut pas être annulée.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                    Annuler
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleReject}
                    disabled={isLoading}
                  >
                    {isLoading ? "Traitement en cours..." : "Confirmer le refus"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-taxi-blue hover:bg-taxi-blue/90">
                  <Check className="mr-2 h-4 w-4" />
                  Accepter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Accepter le devis</DialogTitle>
                  <DialogDescription>
                    En acceptant ce devis, vous autorisez le centre à effectuer les travaux mentionnés pour un montant total de {quote.amount.toFixed(2)} €.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAcceptDialog(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleAccept}
                    disabled={isLoading}
                    className="bg-taxi-blue hover:bg-taxi-blue/90"
                  >
                    {isLoading ? "Traitement en cours..." : "Confirmer l'acceptation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        
        <Button variant="outline" className="w-full mt-3 flex items-center justify-center">
          <Download className="mr-2 h-4 w-4" />
          Télécharger le devis
        </Button>
      </div>
    </MobileLayout>
  );
};

export default QuoteDetails;
