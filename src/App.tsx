
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
            
            {/* Profile & Settings */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            
            {/* Services */}
            <Route path="/services" element={<Services />} />
            <Route path="/search" element={<Search />} />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
