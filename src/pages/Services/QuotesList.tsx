
import React from 'react';
import { Link } from 'react-router-dom';
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
          <div className="badge badge-success gap-1">
            <CheckCircle size={12} />
            Accepté
          </div>
        );
      case 'rejected':
        return (
          <div className="badge badge-error gap-1">
            <XCircle size={12} />
            Refusé
          </div>
        );
      default:
        return (
          <div className="badge badge-warning gap-1">
            <Clock size={12} />
            En attente
          </div>
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
                <div className="card bg-base-100 shadow-sm hover:shadow transition-shadow">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary/20 text-primary rounded-full w-12">
                            <FileText className="h-6 w-6" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                          <p className="text-sm opacity-75">{quote.createdAt}</p>
                          <div className="mt-1">
                            {getQuoteStatusDisplay(quote)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-medium">{quote.total.toFixed(2)} €</p>
                        </div>
                        <ChevronRight className="h-5 w-5 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center text-center py-12">
              <div className="avatar placeholder mb-4">
                <div className="bg-base-300 text-base-content rounded-full w-24 h-24 flex items-center justify-center">
                  <AlertCircle className="h-12 w-12" />
                </div>
              </div>
              <h3 className="text-lg font-medium">Aucun devis</h3>
              <p className="mt-1 text-sm opacity-75">
                Vous n'avez pas encore de devis. Demandez un devis pour commencer.
              </p>
              <div className="card-actions justify-center mt-4">
                <Link to="/services/quotes/request" className="btn btn-primary">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default QuotesList;
