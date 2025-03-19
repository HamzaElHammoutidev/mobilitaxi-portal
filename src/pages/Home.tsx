
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Car, FileText, MapPin, Clock, AlertCircle, User, Check, History } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useServices } from '@/contexts/ServiceContext';
import { cn } from '@/lib/utils';
import BottomNavbar from '@/components/layout/BottomNavbar';

const Home = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const { vehicles } = useVehicles();
  const { quotes } = useServices();
  
  // Get upcoming appointments
  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'confirmed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);
  
  // Get pending quotes
  const pendingQuotes = quotes
    .filter(quote => quote.status === 'pending')
    .slice(0, 2);
  
  return (
    <MobileLayout title="Centre du Taxi">
      <div className="flex flex-col bg-gray-50 pb-20">
        <div className="px-4 pt-4 pb-8">
          {/* Welcome section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Bonjour, {user?.name || 'Client'}</h2>
            <p className="text-gray-600">Bienvenue au portail de Centre du Taxi</p>
          </div>
          
          {/* Status section */}
          <Card className="mb-6 border-0 shadow-md rounded-xl overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-yellow-50 to-yellow-100">
              <CardTitle className="text-lg flex items-center text-gray-800">
                <User className="mr-2 text-yellow-600" size={18} />
                État du compte
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center mb-2">
                <div className={cn(
                  "mr-2 rounded-full w-3 h-3",
                  user?.status === 'pending' ? "bg-amber-500" : "bg-green-500"
                )}></div>
                <span className="font-medium text-gray-800">
                  {user?.status === 'pending' ? 'En attente de validation' : 'Compte validé'}
                </span>
              </div>
              {user?.status === 'pending' && (
                <p className="text-sm text-gray-600">
                  Votre compte sera validé lors de votre prochaine visite à l'un de nos centres.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Quick actions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Actions rapides</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/history">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="bg-yellow-100 p-3 rounded-xl mb-2 text-yellow-600">
                      <History className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Historique</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/services/quotes">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-xl mb-2 text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Devis</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/invoices">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-xl mb-2 text-green-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Factures</span>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/locations">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl bg-white">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-xl mb-2 text-amber-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Centres</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
          
          {/* Upcoming appointments */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <Clock className="mr-2 text-yellow-600" size={18} />
              Prochains rendez-vous
            </h3>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map(appointment => (
                  <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{appointment.date} à {appointment.time}</p>
                            <p className="text-sm text-gray-600">{appointment.centerLocation}</p>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check size={12} className="mr-1" />
                                Confirmé
                              </span>
                            </div>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded-xl text-yellow-600">
                            <Calendar className="h-6 w-6 flex-shrink-0" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                <Button asChild variant="outline" className="w-full rounded-xl border-yellow-300 text-yellow-800 hover:bg-yellow-50">
                  <Link to="/appointments">Voir tous les rendez-vous</Link>
                </Button>
              </div>
            ) : (
              <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center text-center py-6">
                  <div className="bg-gray-100 p-3 rounded-xl mb-3 text-gray-400">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <p className="text-gray-600 mb-4">Aucun rendez-vous à venir</p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-gray-800 font-semibold rounded-xl">
                    <Link to="/appointments/new">Prendre rendez-vous</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Vehicle status */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <Car className="mr-2 text-yellow-600" size={18} />
              État des véhicules
            </h3>
            
            {vehicles.length > 0 ? (
              <div className="space-y-3">
                {vehicles.slice(0, 2).map(vehicle => (
                  <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{vehicle.make} {vehicle.model} {vehicle.year}</p>
                            <p className="text-sm text-gray-600">Plaque: {vehicle.licensePlate}</p>
                            <div className="mt-2">
                              <span className={cn(
                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                vehicle.status === 'active' 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              )}>
                                {vehicle.status === 'active' ? 'Actif' : 'En attente'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Prochain service</p>
                            <p className="text-sm font-medium text-gray-800">{vehicle.nextServiceDue}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                <Button asChild variant="outline" className="w-full rounded-xl border-yellow-300 text-yellow-800 hover:bg-yellow-50">
                  <Link to="/vehicles">Voir tous les véhicules</Link>
                </Button>
              </div>
            ) : (
              <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center text-center py-6">
                  <div className="bg-gray-100 p-3 rounded-xl mb-3 text-gray-400">
                    <Car className="h-8 w-8" />
                  </div>
                  <p className="text-gray-600 mb-1">Aucun véhicule associé</p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">
                    Vos véhicules seront associés lors de votre prochaine visite à un centre.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Pending requests */}
          {pendingQuotes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <AlertCircle className="mr-2 text-yellow-600" size={18} />
                Devis en attente
              </h3>
              
              <div className="space-y-3">
                {pendingQuotes.map(quote => (
                  <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">Devis #{quote.id.substring(0, 5)}</p>
                            <p className="text-sm text-gray-600">{quote.services.length} services</p>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                En attente
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Date de demande</p>
                            <p className="text-sm font-medium text-gray-800">{quote.createdAt}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                <Button asChild variant="outline" className="w-full rounded-xl border-yellow-300 text-yellow-800 hover:bg-yellow-50">
                  <Link to="/services/quotes">Voir tous les devis</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavbar />
    </MobileLayout>
  );
};

export default Home;
