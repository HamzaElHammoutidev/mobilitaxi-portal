import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import BottomNavbar from './components/layout/BottomNavbar';
import Home from './pages/Home/Home';
import Vehicles from './pages/Vehicles/Vehicles';
import History from './pages/History/History';
import Services from './pages/Services/Services';
import Profile from './pages/Profile/Profile';
import ServicesList from './pages/Services/ServicesList';
import ServiceDetails from './pages/Services/ServiceDetails';
import { ServiceProvider } from './contexts/ServiceContext';
import RequestQuote from './pages/Services/RequestQuote';
import FinancesPage from './pages/Finances/FinancesPage';
import QuoteDetails from './pages/Services/QuoteDetails';
import { Toaster } from 'sonner';

function App() {
  return (
    <ServiceProvider>
      <Router>
        <MobileLayout>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/history" element={<History />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/list" element={<ServicesList />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/services/request-quote" element={<RequestQuote />} />
            <Route path="/services/quotes/:id" element={<QuoteDetails />} />
            <Route path="/finances" element={<FinancesPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MobileLayout>
        <BottomNavbar />
      </Router>
    </ServiceProvider>
  );
}

export default App;
