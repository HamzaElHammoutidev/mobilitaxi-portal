
import React, { useState } from 'react';
import { Search as SearchIcon, Car, Calendar, FileText, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileLayout from '@/components/layout/MobileLayout';

const SearchResult = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  link 
}: { 
  icon: React.ElementType, 
  title: string, 
  subtitle: string, 
  link: string 
}) => {
  return (
    <a href={link}>
      <Card className="mb-3 hover:bg-muted/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-taxi-yellow/10 p-3 rounded-full">
              <Icon className="h-5 w-5 text-taxi-yellow" />
            </div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock search results
  const allResults = [
    { icon: Car, title: 'Toyota Camry 2020', subtitle: 'Plaque: ABC-123', link: '/vehicles/1' },
    { icon: Calendar, title: 'Rendez-vous 12 juillet', subtitle: 'Centre du Taxi - Montréal', link: '/appointments/1' },
    { icon: FileText, title: 'Devis #12345', subtitle: 'En attente - 2 services', link: '/services/quotes/1' },
    { icon: MapPin, title: 'Centre du Taxi - Montréal', subtitle: '123 Rue Principale', link: '/locations/1' }
  ];
  
  const centerResults = [
    { icon: MapPin, title: 'Centre du Taxi - Montréal', subtitle: '123 Rue Principale', link: '/locations/1' },
    { icon: MapPin, title: 'Centre du Taxi - Québec', subtitle: '456 Rue des Pins', link: '/locations/2' }
  ];
  
  const vehicleResults = [
    { icon: Car, title: 'Toyota Camry 2020', subtitle: 'Plaque: ABC-123', link: '/vehicles/1' },
    { icon: Car, title: 'Honda Accord 2019', subtitle: 'Plaque: XYZ-789', link: '/vehicles/2' }
  ];
  
  const appointmentResults = [
    { icon: Calendar, title: 'Rendez-vous 12 juillet', subtitle: 'Centre du Taxi - Montréal', link: '/appointments/1' },
    { icon: Calendar, title: 'Rendez-vous 15 juillet', subtitle: 'Centre du Taxi - Québec', link: '/appointments/2' }
  ];
  
  const renderResults = () => {
    if (!searchQuery) {
      return (
        <div className="text-center py-8 text-gray-500">
          <SearchIcon className="mx-auto h-12 w-12 mb-3 text-gray-300" />
          <p>Recherchez des rendez-vous, véhicules, centres ou documents</p>
        </div>
      );
    }
    
    let results;
    
    switch(activeTab) {
      case 'centers':
        results = centerResults;
        break;
      case 'vehicles':
        results = vehicleResults;
        break;
      case 'appointments':
        results = appointmentResults;
        break;
      default:
        results = allResults;
    }
    
    if (results.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun résultat trouvé</p>
        </div>
      );
    }
    
    return (
      <div>
        {results.map((result, index) => (
          <SearchResult 
            key={index}
            icon={result.icon}
            title={result.title}
            subtitle={result.subtitle}
            link={result.link}
          />
        ))}
      </div>
    );
  };
  
  return (
    <MobileLayout title="Recherche">
      <div className="p-4">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="centers">Centres</TabsTrigger>
            <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">{renderResults()}</TabsContent>
          <TabsContent value="centers">{renderResults()}</TabsContent>
          <TabsContent value="vehicles">{renderResults()}</TabsContent>
          <TabsContent value="appointments">{renderResults()}</TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Search;
