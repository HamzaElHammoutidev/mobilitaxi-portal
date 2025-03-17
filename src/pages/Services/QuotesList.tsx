
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight, AlertCircle, Plus } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';

interface Quote {
  id: string;
  reference: string;
  date: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

const QuotesList = () => {
  const { user } = useAuth();
  
  // Mock data for quotes
  const quotes: Quote[] = [
    {
      id: 'q1',
      reference: 'DEVIS-2024-001',
      date: '2024-06-18',
      amount: 155.50,
      status: 'pending'
    },
    {
      id: 'q2',
      reference: 'DEVIS-2024-002',
      date: '2024-06-10',
      amount: 289.99,
      status: 'accepted'
    },
    {
      id: 'q3',
      reference: 'DEVIS-2024-003',
      date: '2024-05-30',
      amount: 95.00,
      status: 'expired'
    }
  ];
  
  return (
    <MobileLayout title="Mes devis" showBackButton>
      <div className="p-4">
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
                          <p className="font-medium">{quote.reference}</p>
                          <p className="text-sm text-gray-600">{quote.date}</p>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              quote.status === 'accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : quote.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : quote.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                              {quote.status === 'accepted' ? 'Accepté' : 
                               quote.status === 'pending' ? 'En attente' : 
                               quote.status === 'rejected' ? 'Refusé' : 'Expiré'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-medium">{quote.amount.toFixed(2)} €</p>
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
      </div>
    </MobileLayout>
  );
};

export default QuotesList;
