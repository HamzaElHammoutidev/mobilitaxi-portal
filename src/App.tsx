
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { ServiceProvider } from "./contexts/ServiceContext";
import { VehicleProvider } from "./contexts/VehicleContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RegistrationSuccess from "./pages/Auth/RegistrationSuccess";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/Help";
import Search from "./pages/Search/Search";
import Services from "./pages/Services/Services";
import AppointmentsList from "./pages/Appointments/AppointmentsList";
import AppointmentNew from "./pages/Appointments/AppointmentNew";
import AppointmentDetails from "./pages/Appointments/AppointmentDetails";
import VehicleDetails from "./pages/Vehicles/VehicleDetails";
import LocationDetails from "./pages/Locations/LocationDetails";
import ServicesList from "./pages/Services/ServicesList";
import DocumentScan from "./pages/Documents/DocumentScan";
import DocumentsList from "./pages/Documents/DocumentsList";
import HistoryList from "./pages/History/HistoryList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <VehicleProvider>
          <ServiceProvider>
            <AppointmentProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/registration-success" element={<RegistrationSuccess />} />
                  
                  {/* Appointments */}
                  <Route path="/appointments" element={<AppointmentsList />} />
                  <Route path="/appointments/new" element={<AppointmentNew />} />
                  <Route path="/appointments/:id" element={<AppointmentDetails />} />
                  
                  {/* Vehicles */}
                  <Route path="/vehicles/:id" element={<VehicleDetails />} />
                  
                  {/* Locations */}
                  <Route path="/locations/:id" element={<LocationDetails />} />
                  
                  {/* Profile & Settings */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Help />} />
                  
                  {/* Services */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/list" element={<ServicesList />} />
                  
                  {/* Documents */}
                  <Route path="/documents/scan" element={<DocumentScan />} />
                  <Route path="/documents/list" element={<DocumentsList />} />
                  
                  {/* History */}
                  <Route path="/history" element={<HistoryList />} />
                  <Route path="/vehicles/history" element={<HistoryList />} />
                  
                  <Route path="/search" element={<Search />} />
                  
                  {/* Catch all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AppointmentProvider>
          </ServiceProvider>
        </VehicleProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

