
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Clock, List, ArrowRight } from 'lucide-react';
import { useServices } from '@/contexts/ServiceContext';
import MobileLayout from '@/components/layout/MobileLayout';

const Services = () => {
  const { services } = useServices();
  const navigate = useNavigate();
  
  const handleRequestQuote = () => {
    navigate('/services/quotes/request');
  };
  
  return (
    <MobileLayout title="Services">
      <div className="p-4 pb-20">
        {/* Services Banner */}
        <div className="card bg-primary text-primary-content mb-6">
          <div className="card-body p-6 text-center">
            <h2 className="card-title text-xl justify-center mb-2">
              Catalogue de services
            </h2>
            <p className="mb-4">
              Découvrez tous nos services pour votre taxi
            </p>
            <div className="card-actions justify-center">
              <Link to="/services/list" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                Voir les services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-4 mb-6">
          <button 
            className="btn btn-secondary flex-1"
            onClick={handleRequestQuote}
          >
            Demander un devis
          </button>
          
          <Link to="/services/quotes/list" className="btn btn-outline btn-secondary flex-1">
            <List className="mr-2 h-4 w-4" /> Mes devis
          </Link>
        </div>
        
        {/* Recent services section */}
        <h3 className="font-medium text-lg mb-3">Services récents</h3>
        
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.slice(0, 3).map(service => (
              <Link to={`/services/${service.id}`} key={service.id} className="block">
                <div className="card bg-base-100 shadow-sm hover:shadow transition-shadow">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm opacity-75">Catégorie: {service.category}</p>
                        <div className="mt-1">
                          <div className="badge badge-ghost gap-1">
                            <Clock size={12} /> {service.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium">
                        {service.price ? `${service.price} €` : 'Prix sur demande'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            <Link to="/services/list" className="btn btn-outline btn-primary w-full">
              Voir tous les services <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="opacity-75">Aucun service récent</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Services;
