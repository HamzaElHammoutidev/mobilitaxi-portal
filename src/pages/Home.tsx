
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Car, FileText, MapPin, Clock, AlertCircle, User, Check } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';
import { useVehicles } from '@/contexts/VehicleContext';
import { useServices } from '@/contexts/ServiceContext';
import { cn } from '@/lib/utils';

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
    <MobileLayout>
      <div className="p-4">
        {/* Welcome section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-taxi-blue">Bonjour, {user?.name}</h2>
          <p className="text-gray-600">Bienvenue au portail de Centre du Taxi</p>
        </div>
        
        {/* Status section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2" size={18} />
              État du compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <div className={cn(
                "mr-2 rounded-full w-3 h-3",
                user?.status === 'pending' ? "bg-amber-500" : "bg-green-500"
              )}></div>
              <span className="font-medium">
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
        <h3 className="text-lg font-medium text-gray-800 mb-3">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/appointments/new">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 mb-2 text-taxi-blue" />
                <span className="text-sm font-medium">Prendre rendez-vous</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/services/quotes">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <FileText className="h-8 w-8 mb-2 text-taxi-blue" />
                <span className="text-sm font-medium">Devis</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/invoices">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <FileText className="h-8 w-8 mb-2 text-taxi-blue" />
                <span className="text-sm font-medium">Factures</span>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/locations">
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <MapPin className="h-8 w-8 mb-2 text-taxi-blue" />
                <span className="text-sm font-medium">Centres</span>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        {/* Upcoming appointments */}
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <Clock className="mr-2" size={18} />
          Prochains rendez-vous
        </h3>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-3 mb-6">
            {upcomingAppointments.map(appointment => (
              <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{appointment.date} à {appointment.time}</p>
                        <p className="text-sm text-gray-600">{appointment.centerLocation}</p>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check size={12} className="mr-1" />
                            Confirmé
                          </span>
                        </div>
                      </div>
                      <Calendar className="h-8 w-8 text-taxi-blue flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/appointments">Voir tous les rendez-vous</Link>
            </Button>
          </div>
        ) : (
          <Card className="mb-6">
            <CardContent className="p-4 flex flex-col items-center text-center py-6">
              <Calendar className="h-12 w-12 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun rendez-vous à venir</p>
              <Button asChild className="mt-4 bg-taxi-blue hover:bg-taxi-blue/90">
                <Link to="/appointments/new">Prendre rendez-vous</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Vehicle status */}
        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
          <Car className="mr-2" size={18} />
          État des véhicules
        </h3>
        
        {vehicles.length > 0 ? (
          <div className="space-y-3 mb-6">
            {vehicles.slice(0, 2).map(vehicle => (
              <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{vehicle.make} {vehicle.model} {vehicle.year}</p>
                        <p className="text-sm text-gray-600">Plaque: {vehicle.licensePlate}</p>
                        <div className="mt-1">
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
                        <p className="text-sm font-medium">{vehicle.nextServiceDue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/vehicles">Voir tous les véhicules</Link>
            </Button>
          </div>
        ) : (
          <Card className="mb-6">
            <CardContent className="p-4 flex flex-col items-center text-center py-6">
              <Car className="h-12 w-12 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Aucun véhicule associé</p>
              <p className="text-xs text-gray-500 mt-2">
                Vos véhicules seront associés lors de votre prochaine visite à un centre.
              </p>
            </CardContent>
          </Card>
        )}
        
        {/* Pending requests */}
        {pendingQuotes.length > 0 && (
          <>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              <AlertCircle className="mr-2" size={18} />
              Devis en attente
            </h3>
            
            <div className="space-y-3 mb-6">
              {pendingQuotes.map(quote => (
                <Link to={`/services/quotes/${quote.id}`} key={quote.id}>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Devis #{quote.id.substring(0, 5)}</p>
                          <p className="text-sm text-gray-600">{quote.services.length} services</p>
                          <div className="mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              En attente
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Date de demande</p>
                          <p className="text-sm font-medium">{quote.createdAt}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/services/quotes">Voir tous les devis</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default Home;
