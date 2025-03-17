
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Clock, CheckCircle, XCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices, Service } from '@/contexts/ServiceContext';
import { cn } from '@/lib/utils';

const ServicesList = () => {
  const { services, quotes } = useServices();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);
  
  // Group quotes by status
  const pendingQuotes = quotes.filter(quote => quote.status === 'pending');
  const approvedQuotes = quotes.filter(quote => quote.status === 'approved');
  const rejectedQuotes = quotes.filter(quote => quote.status === 'rejected');
  
  return (
    <MobileLayout title="Services et Devis">
      <div className="p-4">
        <Tabs defaultValue="services" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Catalogue</TabsTrigger>
            <TabsTrigger value="quotes">Mes devis</TabsTrigger>
          </TabsList>
          
          {/* Services catalog */}
          <TabsContent value="services">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un service..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              {Object.keys(servicesByCategory).length > 0 ? (
                Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium mb-3">{category}</h3>
                    <div className="space-y-3">
                      {categoryServices.map(service => (
                        <Link to={`/services/${service.id}`} key={service.id}>
                          <Card className="hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-sm text-gray-600">{service.description}</p>
                                  <div className="flex mt-2 space-x-3">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                      <Clock size={12} className="mr-1" />
                                      {service.estimatedDuration} min
                                    </span>
                                    {service.price && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {service.price.toFixed(2)} $
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <FileText className="h-8 w-8 text-taxi-blue flex-shrink-0" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <SearchIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucun service trouvé</p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <Button asChild className="w-full bg-taxi-blue hover:bg-taxi-blue/90">
                <Link to="/services/request-quote">Demander un devis</Link>
              </Button>
            </div>
          </TabsContent>
          
          {/* Quotes list */}
          <TabsContent value="quotes">
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
                                      {quote.total.toFixed(2)} $
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
        </Tabs>
      </div>
    </MobileLayout>
  );
};

// Custom search icon component
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default ServicesList;
