
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-taxi-gray p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle size={60} className="text-green-500" />
            </div>
            <CardTitle>Inscription réussie!</CardTitle>
            <CardDescription>
              Votre compte a été créé avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Votre compte est actuellement en attente de validation.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <h3 className="text-amber-800 font-medium mb-2">Prochaines étapes</h3>
              <p className="text-amber-700 text-sm">
                Lors de votre prochaine visite à l'un de nos centres, un agent validera
                votre compte et associera vos véhicules à votre profil.
              </p>
            </div>
            <p className="text-gray-600">
              Vous pouvez vous connecter dès maintenant pour explorer l'application et
              planifier votre première visite.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
              <Link to="/login">Se connecter</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
