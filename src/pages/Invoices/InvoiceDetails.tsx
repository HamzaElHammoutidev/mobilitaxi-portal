
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data for the invoice
  const invoice = {
    id: id || 'inv1',
    number: 'INV-2024-001',
    date: '2024-06-15',
    dueDate: '2024-07-15',
    amount: 125.50,
    status: 'paid',
    items: [
      { description: 'Inspection de routine', amount: 75.00 },
      { description: 'Remplacement filtres', amount: 35.50 },
      { description: 'Contrôle technique', amount: 15.00 }
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
  
  if (!invoice) {
    return (
      <MobileLayout title="Détails de la facture" showBackButton>
        <div className="p-4 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-amber-500" />
          <p className="text-lg font-medium">Facture introuvable</p>
          <Button onClick={() => navigate('/invoices')} className="mt-4">
            Retour aux factures
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title="Détails de la facture" showBackButton>
      <div className="p-4">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle size={16} className="mr-2" />
            Payée
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Facture</p>
                <p className="font-medium">{invoice.number}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Date d'émission</p>
                <p className="font-medium">{invoice.date}</p>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center gap-4">
              <div className="bg-taxi-yellow/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-taxi-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Date d'échéance</p>
                <p className="font-medium">{invoice.dueDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Détails</h3>
            
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <p className="text-gray-700">{item.description}</p>
                <p className="font-medium">{item.amount.toFixed(2)} €</p>
              </div>
            ))}
            
            <Separator className="my-3" />
            
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Total HT</p>
              <p className="font-medium">{(invoice.amount / 1.2).toFixed(2)} €</p>
            </div>
            
            <div className="flex justify-between py-2">
              <p className="text-gray-700">TVA (20%)</p>
              <p className="font-medium">{(invoice.amount - invoice.amount / 1.2).toFixed(2)} €</p>
            </div>
            
            <div className="flex justify-between py-2 font-bold">
              <p>Total</p>
              <p>{invoice.amount.toFixed(2)} €</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Informations véhicule</h3>
            <p className="text-gray-700">{invoice.vehicle.make} {invoice.vehicle.model} {invoice.vehicle.year}</p>
            <p className="text-gray-700">Plaque: {invoice.vehicle.plate}</p>
            
            <Separator className="my-3" />
            
            <h3 className="font-medium mb-2">Centre de service</h3>
            <p className="text-gray-700">{invoice.center.name}</p>
            <p className="text-gray-700">{invoice.center.address}</p>
          </CardContent>
        </Card>
        
        <Button className="w-full flex items-center justify-center bg-taxi-blue hover:bg-taxi-blue/90">
          <Download className="mr-2 h-4 w-4" />
          Télécharger la facture
        </Button>
      </div>
    </MobileLayout>
  );
};

export default InvoiceDetails;
