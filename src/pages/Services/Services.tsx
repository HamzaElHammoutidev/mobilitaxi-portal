
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useServices } from '@/contexts/ServiceContext';
import BottomNavbar from '@/components/layout/BottomNavbar';
import MobileLayout from '@/components/layout/MobileLayout';

const Services = () => {
  const { services } = useServices();
  const navigate = useNavigate();
  
  const handleRequestQuote = () => {
    navigate('/services/quotes');
  };
  
  return (
    <MobileLayout title="Services">
      <div className="p-4 pb-20">
        {/* Services Banner */}
        <div className="bg-[#FFD500] rounded-3xl p-6 mb-6 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Catalogue de services
          </h2>
          <p className="text-gray-800 mb-4">
            Découvrez tous nos services pour votre taxi
          </p>
          <Button 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            asChild
          >
            <Link to="/services/list">Voir les services</Link>
          </Button>
        </div>
        
        {/* Recent services section */}
        <h3 className="font-medium text-lg mb-3">Services récents</h3>
        
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.slice(0, 3).map(service => (
              <Link to={`/services/${service.id}`} key={service.id}>
                <Card className="hover:shadow-md transition-shadow border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">Catégorie: {service.category}</p>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Clock size={12} className="mr-1" />
                            {service.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">{service.price ? `${service.price} €` : 'Prix sur demande'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full border-[#FFD500] text-gray-800 hover:bg-[#FFD500]/10"
              asChild
            >
              <Link to="/services/list">Voir tous les services</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500">Aucun service récent</p>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
            onClick={handleRequestQuote}
          >
            Demander un devis
          </Button>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavbar />
    </MobileLayout>
  );
};

export default Services;
