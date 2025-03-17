
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ChevronRight, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices, Quote } from '@/contexts/ServiceContext';

const QuotesList = () => {
  const { quotes } = useServices();
  
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
  
  return (
    <MobileLayout title="Mes devis" showBackButton>
      <div className="p-4 pb-20">
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
              Vous n'avez pas encore de devis. Demandez un devis pour commencer.
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default QuotesList;
