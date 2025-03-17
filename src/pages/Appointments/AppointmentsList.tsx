
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAppointments } from '@/contexts/AppointmentContext';
import { cn } from '@/lib/utils';

const AppointmentsList = () => {
  const { appointments } = useAppointments();
  
  // Group appointments by status
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');
  
  return (
    <MobileLayout title="Mes rendez-vous">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rendez-vous</h2>
          <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
            <Link to="/appointments/new">Nouveau</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="past">Passés</TabsTrigger>
          </TabsList>
          
          {/* Upcoming appointments */}
          <TabsContent value="upcoming">
            {confirmedAppointments.length > 0 ? (
              <div className="space-y-3">
                {confirmedAppointments.map(appointment => (
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
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Aucun rendez-vous confirmé</p>
                <Button asChild className="bg-taxi-blue hover:bg-taxi-blue/90">
                  <Link to="/appointments/new">Prendre rendez-vous</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Pending appointments */}
          <TabsContent value="pending">
            {pendingAppointments.length > 0 ? (
              <div className="space-y-3">
                {pendingAppointments.map(appointment => (
                  <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.date} à {appointment.time}</p>
                            <p className="text-sm text-gray-600">{appointment.centerLocation}</p>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <Clock size={12} className="mr-1" />
                                En attente
                              </span>
                            </div>
                          </div>
                          <Calendar className="h-8 w-8 text-amber-500 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun rendez-vous en attente</p>
              </div>
            )}
          </TabsContent>
          
          {/* Past appointments */}
          <TabsContent value="past">
            {pastAppointments.length > 0 ? (
              <div className="space-y-3">
                {pastAppointments.map(appointment => (
                  <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.date} à {appointment.time}</p>
                            <p className="text-sm text-gray-600">{appointment.centerLocation}</p>
                            <div className="mt-1">
                              <span className={cn(
                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                appointment.status === 'completed' 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              )}>
                                {appointment.status === 'completed' ? (
                                  <>
                                    <Check size={12} className="mr-1" />
                                    Complété
                                  </>
                                ) : (
                                  <>
                                    <X size={12} className="mr-1" />
                                    Annulé
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                          <Calendar className="h-8 w-8 text-gray-400 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Aucun rendez-vous passé</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default AppointmentsList;
