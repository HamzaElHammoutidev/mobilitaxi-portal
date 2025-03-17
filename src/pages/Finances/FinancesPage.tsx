
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, XCircle, Receipt, CreditCard } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';

const FinancesPage = () => {
  const { quotes } = useServices();
  
  // Group quotes by status
  const pendingQuotes = quotes.filter(quote => quote.status === 'pending');
  const approvedQuotes = quotes.filter(quote => quote.status === 'approved');
  const rejectedQuotes = quotes.filter(quote => quote.status === 'rejected');
  
  // Mock invoices data
  const invoices = [
    {
      id: 'i1',
      reference: 'FACT-2024-0001',
      date: '2024-05-15',
      amount: 249.99,
      status: 'paid',
      description: 'Inspection annuelle et changement d\'huile'
    },
    {
      id: 'i2',
      reference: 'FACT-2024-0002',
      date: '2024-06-02',
      amount: 175.50,
      status: 'pending',
      description: 'Réparation des freins et diagnostic électronique'
    }
  ];
  
  return (
    <MobileLayout title="Finances">
      <div className="p-4">
        <Tabs defaultValue="quotes" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quotes">Devis</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
          </TabsList>
          
          {/* Quotes tab */}
          <TabsContent value="quotes">
            <div className="mb-4">
              <Button asChild className="w-full bg-taxi-blue hover:bg-taxi-blue/90">
                <Link to="/services/request-quote">Demander un devis</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Pending quotes */}
              {pendingQuotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">En attente</h3>
                  <div className="space-y-3">
                    {pendingQuotes.map(quote => (
                      <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                        <Card className="hover:bg-muted/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                                <p className="text-sm text-gray-600">
                                  {quote.services.length} service{quote.services.length > 1 ? 's' : ''}
                                </p>
                                <div className="flex mt-2 space-x-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    <Clock size={12} className="mr-1" />
                                    En attente
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Demandé le</p>
                                <p className="text-sm font-medium">{quote.createdAt}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Approved quotes */}
              {approvedQuotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Approuvés</h3>
                  <div className="space-y-3">
                    {approvedQuotes.map(quote => (
                      <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                        <Card className="hover:bg-muted/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                                <p className="text-sm text-gray-600">
                                  {quote.services.length} service{quote.services.length > 1 ? 's' : ''}
                                </p>
                                <div className="flex mt-2 space-x-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle size={12} className="mr-1" />
                                    Approuvé
                                  </span>
                                  {quote.total > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {quote.total.toFixed(2)} €
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Valide jusqu'au</p>
                                <p className="text-sm font-medium">{quote.validUntil}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Rejected quotes */}
              {rejectedQuotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Refusés</h3>
                  <div className="space-y-3">
                    {rejectedQuotes.map(quote => (
                      <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                        <Card className="hover:bg-muted/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                                <p className="text-sm text-gray-600">
                                  {quote.services.length} service{quote.services.length > 1 ? 's' : ''}
                                </p>
                                <div className="flex mt-2 space-x-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <XCircle size={12} className="mr-1" />
                                    Refusé
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Demandé le</p>
                                <p className="text-sm font-medium">{quote.createdAt}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {quotes.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Aucun devis</p>
                  <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
                    <Link to="/services/request-quote">Demander un devis</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Invoices tab */}
          <TabsContent value="invoices">
            <div className="space-y-4">
              {invoices.length > 0 ? (
                <>
                  {/* Pending invoices */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">À payer</h3>
                    <div className="space-y-3">
                      {invoices
                        .filter(invoice => invoice.status === 'pending')
                        .map(invoice => (
                          <Link to={`/invoices/${invoice.id}`} key={invoice.id}>
                            <Card className="hover:bg-muted/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{invoice.reference}</p>
                                    <p className="text-sm text-gray-600">{invoice.description}</p>
                                    <div className="flex mt-2 space-x-2">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                        <Clock size={12} className="mr-1" />
                                        À payer
                                      </span>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {invoice.amount.toFixed(2)} €
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-gray-500">Émise le</p>
                                    <p className="text-sm font-medium">{invoice.date}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                  
                  {/* Paid invoices */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Payées</h3>
                    <div className="space-y-3">
                      {invoices
                        .filter(invoice => invoice.status === 'paid')
                        .map(invoice => (
                          <Link to={`/invoices/${invoice.id}`} key={invoice.id}>
                            <Card className="hover:bg-muted/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{invoice.reference}</p>
                                    <p className="text-sm text-gray-600">{invoice.description}</p>
                                    <div className="flex mt-2 space-x-2">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle size={12} className="mr-1" />
                                        Payée
                                      </span>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {invoice.amount.toFixed(2)} €
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-gray-500">Émise le</p>
                                    <p className="text-sm font-medium">{invoice.date}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucune facture</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default FinancesPage;
