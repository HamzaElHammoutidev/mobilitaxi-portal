
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Calendar, FileText, MapPin, AlertTriangle, Menu, History, FileCheck, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-taxi-gray p-4 flex-col">
        <div className="bg-taxi-yellow p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Car size={40} className="text-taxi-dark" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-taxi-blue">Centre du Taxi</h1>
        <div className="w-full max-w-md space-y-4">
          <Button 
            className="w-full bg-taxi-blue hover:bg-taxi-blue/90"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-taxi-blue text-taxi-blue hover:bg-taxi-blue/10"
            onClick={() => navigate('/register')}
          >
            Créer un compte
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Centre du Taxi</h1>
        <Menu className="text-gray-800" />
      </header>
      
      {/* Main content */}
      <main className="flex-1 pb-20">
        {/* Hero section */}
        <div className="hero-section">
          <h2 className="hero-title">Votre partenaire de confiance</h2>
          <p className="hero-text">pour l'entretien de votre taxi</p>
          <Button 
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
            onClick={() => navigate('/appointments/new')}
          >
            Prendre un rendez-vous
          </Button>
        </div>
        
        {/* Icon navigation */}
        <div className="icon-group">
          <div className="icon-item">
            <div className="icon-container">
              <MapPin className="h-6 w-6 text-gray-800" />
            </div>
            <span className="icon-label">Géolocalisation</span>
          </div>
          
          <div className="icon-item">
            <div className="icon-container">
              <Calendar className="h-6 w-6 text-gray-800" />
            </div>
            <span className="icon-label">Rendez-vous</span>
          </div>
          
          <div className="icon-item">
            <div className="icon-container">
              <FileText className="h-6 w-6 text-gray-800" />
            </div>
            <span className="icon-label">Devis</span>
          </div>
          
          <div className="icon-item">
            <div className="icon-container">
              <AlertTriangle className="h-6 w-6 text-gray-800" />
            </div>
            <span className="icon-label">Réclamations</span>
          </div>
        </div>
        
        {/* Active files section */}
        <div className="card-section">
          <h3 className="card-title">Dossiers Actifs</h3>
          <p className="card-subtitle">Vous avez 3 dossiers en cours.</p>
          
          <Button 
            className="w-full bg-taxi-yellow hover:bg-taxi-yellow/90 text-gray-800 font-semibold py-3"
            onClick={() => navigate('/vehicles')}
          >
            Voir les détails
          </Button>
        </div>
        
        {/* Feature grid */}
        <div className="feature-grid mx-4">
          <Link to="/history" className="feature-card">
            <div className="mb-4 bg-taxi-yellow/30 p-4 rounded-full">
              <History className="h-8 w-8 text-gray-800" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Historique</span>
          </Link>
          
          <Link to="/documents" className="feature-card">
            <div className="mb-4 bg-taxi-yellow/30 p-4 rounded-full">
              <FileCheck className="h-8 w-8 text-gray-800" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Scanner Document</span>
          </Link>
          
          <Link to="/settings" className="feature-card">
            <div className="mb-4 bg-taxi-yellow/30 p-4 rounded-full">
              <Settings className="h-8 w-8 text-gray-800" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Paramètres</span>
          </Link>
          
          <Link to="/help" className="feature-card">
            <div className="mb-4 bg-taxi-yellow/30 p-4 rounded-full">
              <HelpCircle className="h-8 w-8 text-gray-800" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Aide</span>
          </Link>
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="flex flex-col items-center text-sm text-taxi-yellow font-medium">
          <div className="bg-taxi-yellow/20 p-2 rounded-full">
            <Car size={20} className="text-taxi-yellow" />
          </div>
          <span>Accueil</span>
        </Link>
        
        <Link to="/search" className="flex flex-col items-center text-sm text-gray-500">
          <MapPin size={20} />
          <span>Recherche</span>
        </Link>
        
        <Link to="/services" className="flex flex-col items-center text-sm text-gray-500">
          <FileText size={20} />
          <span>Services</span>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center text-sm text-gray-500">
          <div className="bg-gray-200 p-2 rounded-full">
            <Settings size={20} className="text-gray-500" />
          </div>
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Index;
