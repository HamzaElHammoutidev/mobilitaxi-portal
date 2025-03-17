
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Home, Tag, Calendar, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import MobileLayout from '@/components/layout/MobileLayout';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { appointments } = useAppointments();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }
  
  return (
    <MobileLayout showHeader={true}>
      <div className="flex flex-col p-6 pt-2">
        {/* Welcome Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome
        </h1>
        
        {/* Service Categories */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <Button 
            className="bg-amber-100 hover:bg-amber-200 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap"
          >
            Welcome Offer
          </Button>
          
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap border border-gray-100"
            variant="outline"
          >
            Wash & Iron
          </Button>
          
          <Button 
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-full px-5 py-6 whitespace-nowrap border border-gray-100"
            variant="outline"
          >
            Ironing
          </Button>
        </div>
        
        {/* Promotional Banner */}
        <div className="bg-amber-100 rounded-3xl p-6 mb-8 relative overflow-hidden">
          <div className="max-w-[60%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Prepay and save your laundry services
            </h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <div className="bg-orange-400 rounded-full p-1 min-w-5 h-5 flex items-center justify-center mt-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700">€20 minimum order</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-orange-400 rounded-full p-1 min-w-5 h-5 flex items-center justify-center mt-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700">Free 24h delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-orange-400 rounded-full p-1 min-w-5 h-5 flex items-center justify-center mt-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700">Best price guaranteed</span>
              </li>
            </ul>
            
            {/* Discount Badge */}
            <div className="absolute left-4 bottom-24 bg-blue-100 rounded-full h-20 w-20 flex flex-col items-center justify-center text-center p-1 border-4 border-white shadow-sm">
              <span className="text-xs text-blue-800">up to</span>
              <span className="text-xl font-bold text-blue-800">30%</span>
              <span className="text-xs text-blue-800">off</span>
            </div>
            
            {/* Order Now Button */}
            <Button 
              className="bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-gray-800 font-medium rounded-full px-6 py-5 whitespace-nowrap flex items-center gap-2"
              onClick={() => navigate('/services')}
            >
              <div className="bg-white rounded-full p-1">
                <Check className="h-4 w-4 text-gray-800" />
              </div>
              Order Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          {/* We'll use absolute positioning for the person image */}
          <div className="absolute right-0 bottom-0 h-48 w-40 bg-contain bg-no-repeat bg-bottom"></div>
        </div>
        
        {/* Getting Started Guide */}
        <Card className="mb-8 border-0 shadow-sm rounded-3xl">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="bg-gray-900 text-amber-100 p-3 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M19.5 9.75C19.5 15.75 12 21.75 12 21.75C12 21.75 4.5 15.75 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">Getting Started?</h3>
              <p className="text-gray-500">See how Laundry heap works and learn more about our services.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </CardContent>
        </Card>
        
        {/* Quick Service Icons */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <Link to="/home" className="flex flex-col items-center">
            <div className="bg-amber-100 h-14 w-14 rounded-full flex items-center justify-center mb-2">
              <Home className="h-6 w-6 text-gray-800" />
            </div>
            <span className="text-xs text-center text-gray-600">Home</span>
          </Link>
          
          <Link to="/services" className="flex flex-col items-center">
            <div className="bg-gray-100 h-14 w-14 rounded-full flex items-center justify-center mb-2">
              <Tag className="h-6 w-6 text-gray-800" />
            </div>
            <span className="text-xs text-center text-gray-600">Orders</span>
          </Link>
          
          <Link to="/appointments" className="flex flex-col items-center">
            <div className="bg-gray-100 h-14 w-14 rounded-full flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-gray-800" />
            </div>
            <span className="text-xs text-center text-gray-600">Calendar</span>
          </Link>
          
          <Link to="/documents" className="flex flex-col items-center">
            <div className="bg-gray-100 h-14 w-14 rounded-full flex items-center justify-center mb-2">
              <Menu className="h-6 w-6 text-gray-800" />
            </div>
            <span className="text-xs text-center text-gray-600">More</span>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
