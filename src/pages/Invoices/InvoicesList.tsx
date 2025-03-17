
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ChevronRight, AlertCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

const InvoicesList = () => {
  const { user } = useAuth();
  
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
  
  return (
    <MobileLayout title="Mes factures" showBackButton>
      <div className="p-4">
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
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : invoice.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status === 'paid' ? 'Payée' : invoice.status === 'pending' ? 'En attente' : 'En retard'}
                            </span>
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
      </div>
    </MobileLayout>
  );
};

export default InvoicesList;
