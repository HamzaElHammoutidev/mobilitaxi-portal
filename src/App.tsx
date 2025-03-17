
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Auth pages
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import RegistrationSuccess from '@/pages/Auth/RegistrationSuccess';

// Main app pages
import Home from '@/pages/Home';
import Search from '@/pages/Search/Search';

// Services
import Services from '@/pages/Services/Services';
import ServicesList from '@/pages/Services/ServicesList';
import ServiceDetails from '@/pages/Services/ServiceDetails';
import QuotesList from '@/pages/Services/QuotesList';
import QuoteDetails from '@/pages/Services/QuoteDetails';
import QuoteRequest from '@/pages/Services/QuoteRequest';

// Finances
import Finances from '@/pages/Finances/Finances';
import InvoicesList from '@/pages/Invoices/InvoicesList';
import InvoiceDetails from '@/pages/Invoices/InvoiceDetails';

// Vehicles
import VehiclesList from '@/pages/Vehicles/VehiclesList';
import VehicleDetails from '@/pages/Vehicles/VehicleDetails';

// Locations
import CentersList from '@/pages/Locations/CentersList';
import LocationDetails from '@/pages/Locations/LocationDetails';
import LocationsMap from '@/pages/Locations/LocationsMap';

// Appointments
import AppointmentsList from '@/pages/Appointments/AppointmentsList';
import AppointmentDetails from '@/pages/Appointments/AppointmentDetails';
import AppointmentNew from '@/pages/Appointments/AppointmentNew';

// Documents & History
import HistoryList from '@/pages/History/HistoryList';
import DocumentsList from '@/pages/Documents/DocumentsList';
import DocumentScan from '@/pages/Documents/DocumentScan';

// Profile pages
import Profile from '@/pages/Profile/Profile';
import PersonalInfo from '@/pages/Profile/PersonalInfo';
import Security from '@/pages/Profile/Security';
import Payments from '@/pages/Profile/Payments';

// Settings and help
import Settings from '@/pages/Settings/Settings';
import Help from '@/pages/Help/Help';

// Context providers
import { AuthProvider } from '@/contexts/AuthContext';
import { VehicleProvider } from '@/contexts/VehicleContext';
import { CenterProvider } from '@/contexts/CenterContext';
import { AppointmentProvider } from '@/contexts/AppointmentContext';
import { ServiceProvider } from '@/contexts/ServiceContext';

// Root component
function App() {
  return (
    <Router>
      <AuthProvider>
        <VehicleProvider>
          <CenterProvider>
            <AppointmentProvider>
              <ServiceProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/registration-success" element={<RegistrationSuccess />} />
                  
                  {/* Home & Search */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  
                  {/* Service routes */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/list" element={<ServicesList />} />
                  <Route path="/services/:id" element={<ServiceDetails />} />
                  <Route path="/services/quotes/request" element={<QuoteRequest />} />
                  <Route path="/services/quotes/list" element={<QuotesList />} />
                  <Route path="/services/quotes/:id" element={<QuoteDetails />} />
                  
                  {/* Finances routes */}
                  <Route path="/finances" element={<Finances />} />
                  <Route path="/invoices/list" element={<InvoicesList />} />
                  <Route path="/invoices/:id" element={<InvoiceDetails />} />
                  
                  {/* Vehicle routes */}
                  <Route path="/vehicles" element={<VehiclesList />} />
                  <Route path="/vehicles/:id" element={<VehicleDetails />} />
                  
                  {/* Location routes */}
                  <Route path="/locations" element={<CentersList />} />
                  <Route path="/locations/:id" element={<LocationDetails />} />
                  <Route path="/locations/map" element={<LocationsMap />} />
                  
                  {/* Appointment routes */}
                  <Route path="/appointments" element={<AppointmentsList />} />
                  <Route path="/appointments/:id" element={<AppointmentDetails />} />
                  <Route path="/appointments/new" element={<AppointmentNew />} />
                  
                  {/* History & Documents */}
                  <Route path="/history" element={<HistoryList />} />
                  <Route path="/documents" element={<DocumentsList />} />
                  <Route path="/documents/scan" element={<DocumentScan />} />
                  
                  {/* Profile routes */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/personal-info" element={<PersonalInfo />} />
                  <Route path="/profile/security" element={<Security />} />
                  <Route path="/profile/payments" element={<Payments />} />
                  
                  {/* Settings & Help */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  
                  {/* Not found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster position="top-center" />
              </ServiceProvider>
            </AppointmentProvider>
          </CenterProvider>
        </VehicleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
