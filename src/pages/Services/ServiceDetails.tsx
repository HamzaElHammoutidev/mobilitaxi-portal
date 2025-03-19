
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Car, Wrench, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';
import { useServices } from '@/contexts/ServiceContext';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services, addQuote } = useServices();
  
  // Find the service with the matching ID
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <MobileLayout title="Service introuvable" showBackButton>
        <div className="p-4 text-center">
          <div className="avatar placeholder mb-4">
            <div className="bg-error text-error-content rounded-full w-16 h-16 mx-auto">
              <AlertCircle className="h-8 w-8" />
            </div>
          </div>
          <p>Le service demandé n'existe pas ou a été supprimé.</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => navigate('/services')}
          >
            Retour aux services
          </button>
        </div>
      </MobileLayout>
    );
  }
  
  const handleRequestQuote = () => {
    addQuote({
      id: `quote-${Date.now()}`,
      services: [service],
      status: 'pending',
      total: service.price || 0,
      createdAt: new Date().toLocaleDateString()
    });
    
    toast.success("Demande de devis envoyée avec succès");
    navigate('/services/quotes');
  };
  
  const getServiceIcon = () => {
    switch (service.category) {
      case "Maintenance":
        return <Wrench className="h-6 w-6" />;
      case "Inspection":
        return <Car className="h-6 w-6" />;
      case "Repair":
        return <Wrench className="h-6 w-6" />;
      case "Certification":
        return <FileText className="h-6 w-6" />;
      default:
        return <Wrench className="h-6 w-6" />;
    }
  };
  
  return (
    <MobileLayout title={service.name} showBackButton>
      <div className="p-4">
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                  {getServiceIcon()}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">{service.name}</h2>
                <p className="opacity-75">{service.category}</p>
              </div>
            </div>
            
            <p className="mb-4">{service.description}</p>
            
            <div className="flex items-center justify-between mb-2">
              <div className="badge badge-outline gap-2">
                <Clock className="h-4 w-4" />
                {service.estimatedTime}
              </div>
              <span className="font-bold text-lg">{service.price} €</span>
            </div>
          </div>
        </div>
        
        {service.category === "Inspection" && (
          <div className="card bg-base-100 shadow-sm mb-6">
            <div className="card-body p-4">
              <h3 className="font-medium mb-2">L'inspection comprend :</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vérification des points de sécurité</li>
                <li>Analyse des composants mécaniques</li>
                <li>Vérification des équipements obligatoires</li>
                <li>Diagnostic électronique</li>
                <li>Test des lumières et signalisation</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className="btn btn-outline"
            onClick={() => navigate('/appointments/new', { state: { serviceId: service.id } })}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Rendez-vous
          </button>
          
          <button
            className="btn btn-primary"
            onClick={handleRequestQuote}
          >
            <FileText className="mr-2 h-4 w-4" />
            Demander un devis
          </button>
        </div>
        
        <h3 className="font-medium mb-2">Informations complémentaires</h3>
        <p className="text-sm opacity-75 mb-6">
          Ce service est disponible dans tous nos centres. Les rendez-vous sont généralement disponibles sous 48h. 
          Veuillez apporter votre carte grise lors de votre visite.
        </p>
        
        <div className="divider"></div>
        
        <button 
          className="btn btn-secondary w-full"
          onClick={() => navigate('/locations')}
        >
          Trouver un centre
        </button>
      </div>
    </MobileLayout>
  );
};

export default ServiceDetails;
