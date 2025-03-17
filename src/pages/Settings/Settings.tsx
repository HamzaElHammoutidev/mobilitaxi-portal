
import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import MobileLayout from '@/components/layout/MobileLayout';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('fr');
  
  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    // In a real app, you would apply dark mode here
    toast.success(`Mode ${checked ? 'sombre' : 'clair'} activé`);
  };
  
  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    toast.success(`Notifications ${checked ? 'activées' : 'désactivées'}`);
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Langue changée: ${value === 'fr' ? 'Français' : 'English'}`);
  };
  
  return (
    <MobileLayout title="Paramètres" showBackButton>
      <div className="p-4">
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-taxi-yellow/10 p-2 rounded-full">
                      {darkMode ? (
                        <Moon className="h-5 w-5 text-taxi-yellow" />
                      ) : (
                        <Sun className="h-5 w-5 text-taxi-yellow" />
                      )}
                    </div>
                    <Label htmlFor="dark-mode">Mode sombre</Label>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={handleDarkModeChange} 
                  />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-taxi-yellow/10 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-taxi-yellow" />
                    </div>
                    <Label htmlFor="notifications">Notifications</Label>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={notifications} 
                    onCheckedChange={handleNotificationsChange} 
                  />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-taxi-yellow/10 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-taxi-yellow" />
                    </div>
                    <Label htmlFor="language">Langue</Label>
                  </div>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4">
                <h3 className="font-medium">À propos</h3>
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <span>Conditions d'utilisation</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <span>Politique de confidentialité</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                <span>Licences</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="p-4 text-center text-gray-500 text-sm">
                <p>Version 1.0.0</p>
                <p>© 2024 Centre du Taxi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Settings;
