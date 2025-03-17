
import React from 'react';
import { HelpCircle, MessageSquare, Phone, FileText, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

const Help = () => {
  return (
    <MobileLayout title="Aide & Support" showBackButton>
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher dans l'aide"
          />
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4">
                <h3 className="font-medium">Nous contacter</h3>
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-taxi-yellow/10 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-taxi-yellow" />
                  </div>
                  <span>Chat en ligne</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-taxi-yellow/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-taxi-yellow" />
                  </div>
                  <span>Appeler le service client</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-taxi-yellow/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-taxi-yellow" />
                  </div>
                  <span>Formulaire de contact</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h3 className="font-medium mb-4">Questions fréquentes</h3>
        
        <Accordion type="single" collapsible className="bg-white rounded-lg overflow-hidden mb-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              Comment prendre un rendez-vous?
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50">
              <p>
                Pour prendre un rendez-vous, accédez à la page "Rendez-vous" depuis le menu 
                principal et cliquez sur le bouton "Nouveau". Sélectionnez ensuite votre 
                véhicule, le centre souhaité, la date et l'heure qui vous conviennent.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              Comment modifier mes informations personnelles?
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50">
              <p>
                Vous pouvez modifier vos informations personnelles en accédant à la 
                section "Profil" puis en cliquant sur "Informations personnelles". 
                Certaines modifications peuvent nécessiter une validation par notre équipe.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              Comment ajouter un véhicule à mon compte?
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50">
              <p>
                Pour ajouter un véhicule à votre compte, vous devez vous rendre dans l'un de nos
                centres. Un agent vérifiera votre véhicule et l'ajoutera à votre profil. Cette 
                procédure garantit la conformité de tous les véhicules enregistrés.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              Comment annuler un rendez-vous?
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50">
              <p>
                Pour annuler un rendez-vous, accédez à la page "Rendez-vous", 
                sélectionnez le rendez-vous concerné, puis cliquez sur "Annuler le rendez-vous". 
                Veuillez noter que certaines annulations peuvent entraîner des frais selon le délai.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
              Comment obtenir un devis pour une réparation?
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50">
              <p>
                Pour obtenir un devis, allez dans la section "Services" puis "Demander un devis". 
                Sélectionnez votre véhicule et décrivez les services dont vous avez besoin. 
                Notre équipe vous contactera pour vous fournir un devis détaillé.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button className="w-full bg-taxi-blue hover:bg-taxi-blue/90">
          Voir toutes les questions fréquentes
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Help;
