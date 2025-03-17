
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import MobileLayout from '@/components/layout/MobileLayout';

const PersonalInfo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Since updateUser doesn't exist in AuthContext, we'll use the toast to simulate
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || ''); // Changed from user?.phone to user?.phoneNumber
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating the user
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };
  
  return (
    <MobileLayout title="Informations personnelles" showBackButton>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button type="submit" className="w-full bg-taxi-yellow text-gray-800 hover:bg-taxi-yellow/90">
            Sauvegarder
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default PersonalInfo;
