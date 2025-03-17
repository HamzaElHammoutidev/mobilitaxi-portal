
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, ChevronRight, AlertCircle, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useServices, Quote } from '@/contexts/ServiceContext';

// Define a common interface for both invoices and quotes
interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

const Finances = () => {
  const { user } = useAuth();
  const { quotes } = useServices();
  
  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: 'inv1',
      number: 'INV-2024-001',
      date: '2024-06-15',
      amount: 125.50,
      status: 'paid'
    },
    {
      id: 'inv2',
      number: 'INV-2024-002',
      date: '2024-07-01',
      amount: 75.99,
      status: 'pending'
    },
    {
      id: 'inv3',
      number: 'INV-2024-003',
      date: '2024-06-30',
      amount: 210.00,
      status: 'overdue'
    }
  ];
  
  // Helper function to get status display for quotes
  const getQuoteStatusDisplay = (quote: Quote) => {
    switch(quote.status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Accepté
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Refusé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock size={12} className="mr-1" />
            En attente
          </span>
        );
    }
  };
  
  // Helper function to get status display for invoices
  const getInvoiceStatusDisplay = (status: string) => {
    switch(status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Payée
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            En retard
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock size={12} className="mr-1" />
            En attente
          </span>
        );
    }
  };
  
  return (
    <MobileLayout title="Finances">
      <div className="p-4">
        <Tabs defaultValue="quotes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quotes">Devis</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
          </TabsList>
          
          {/* Quotes Tab */}
          <TabsContent value="quotes">
            <Button asChild className="w-full mb-6 bg-taxi-blue hover:bg-taxi-blue/90">
              <Link to="/services">
                <Plus className="mr-2 h-4 w-4" />
                Demander un devis
              </Link>
            </Button>
            
            {quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map(quote => (
                  <Link key={quote.id} to={`/services/quotes/${quote.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-taxi-yellow/20 p-2 rounded-full">
                              <FileText className="h-5 w-5 text-taxi-yellow" />
                            </div>
                            <div>
                              <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                              <p className="text-sm text-gray-600">{quote.createdAt}</p>
                              <div className="mt-1">
                                {getQuoteStatusDisplay(quote)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="font-medium">{quote.total.toFixed(2)} €</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">Aucun devis</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas encore de devis.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            {invoices.length > 0 ? (
              <div className="space-y-4">
                {invoices.map(invoice => (
                  <Link key={invoice.id} to={`/invoices/${invoice.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-taxi-yellow/20 p-2 rounded-full">
                              <FileText className="h-5 w-5 text-taxi-yellow" />
                            </div>
                            <div>
                              <p className="font-medium">{invoice.number}</p>
                              <p className="text-sm text-gray-600">{invoice.date}</p>
                              <div className="mt-1">
                                {getInvoiceStatusDisplay(invoice.status)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <p className="font-medium">{invoice.amount.toFixed(2)} €</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">Aucune facture</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Vous n'avez pas encore de facture.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Finances;
