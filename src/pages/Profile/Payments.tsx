
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
}

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '24',
      cardHolder: 'John Doe',
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '09',
      expiryYear: '25',
      cardHolder: 'John Doe',
    },
  ]);
  
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  
  const handleRemoveCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    toast.success('Carte supprimée avec succès');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (
      !formData.cardNumber ||
      !formData.cardHolder ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvv
    ) {
      toast.error('Veuillez remplir tous les champs');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const newCard: PaymentMethod = {
        id: (paymentMethods.length + 1).toString(),
        type: formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
        last4: formData.cardNumber.slice(-4),
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cardHolder: formData.cardHolder,
      };
      
      setPaymentMethods([...paymentMethods, newCard]);
      
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
      });
      
      setIsLoading(false);
      setShowAddCardDialog(false);
      toast.success('Carte ajoutée avec succès');
    }, 1000);
  };
  
  return (
    <MobileLayout title="Moyens de paiement" showBackButton>
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Cartes enregistrées</h2>
              <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une carte</DialogTitle>
                    <DialogDescription>
                      Ajoutez une nouvelle carte de paiement à votre compte.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddCard}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardHolder">Titulaire de la carte</Label>
                        <Input
                          id="cardHolder"
                          name="cardHolder"
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryMonth">Mois</Label>
                          <Select
                            value={formData.expiryMonth}
                            onValueChange={(value) => handleSelectChange('expiryMonth', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = (i + 1).toString().padStart(2, '0');
                                return (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expiryYear">Année</Label>
                          <Select
                            value={formData.expiryYear}
                            onValueChange={(value) => handleSelectChange('expiryYear', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="YY" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = (new Date().getFullYear() + i).toString().slice(-2);
                                return (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Ajout en cours...' : 'Ajouter la carte'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{method.type} •••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expire {method.expiryMonth}/{method.expiryYear}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCard(method.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">Aucune carte enregistrée</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Facturation</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Adresse de facturation</span>
                <Button variant="link" className="p-0 h-auto">Modifier</Button>
              </div>
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p>123 Rue du Commerce</p>
                <p>75001 Paris, France</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Payments;
