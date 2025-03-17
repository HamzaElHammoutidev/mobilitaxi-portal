
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin, Locate } from 'lucide-react';
import { useCenters, RepairCenter } from '@/contexts/CenterContext';
import { useNavigate } from 'react-router-dom';

// You'll need to replace this with your own Mapbox access token
// Ideally this would be stored in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbG9qbDRtMHUwMnF2MnFxcmVhaXcycHA3In0.94RFDD5Q5DYP9nkYQJFgwg';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  showUserLocation?: boolean;
}

const Map: React.FC<MapProps> = ({ 
  initialCenter = [-73.602364, 45.548656], // Default to Montreal
  initialZoom = 11,
  showUserLocation = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { centers } = useCenters();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const navigate = useNavigate();
  
  mapboxgl.accessToken = MAPBOX_TOKEN;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Get user location if allowed
    if (showUserLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 13,
              essential: true
            });
            
            // Add a marker for user location
            const userMarker = new mapboxgl.Marker({ color: '#3b82f6' })
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML('<p class="font-medium">Votre position</p>'))
              .addTo(map.current);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    }
    
    // Cleanup function
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initialCenter, initialZoom, showUserLocation]);
  
  // Add center markers
  useEffect(() => {
    if (!map.current) return;
    
    // Add markers for each center
    centers.forEach((center) => {
      if (!map.current) return;
      
      const { lat, lng } = center.coordinates;
      
      // Create a custom HTML marker
      const el = document.createElement('div');
      el.className = 'center-marker';
      el.innerHTML = `
        <div class="bg-taxi-yellow p-2 rounded-full shadow-md cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-800">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;
      
      // Center popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-medium text-base">${center.name}</h3>
          <p class="text-sm text-gray-600">${center.address}</p>
          <p class="text-sm text-gray-600">${center.city}, ${center.postalCode}</p>
          <div class="flex justify-end mt-2">
            <button 
              class="bg-taxi-yellow text-xs text-gray-800 font-medium px-3 py-1 rounded hover:bg-taxi-yellow/90"
              onclick="window.navigateToCenter('${center.id}')"
            >
              Voir détails
            </button>
          </div>
        </div>
      `;
      
      // Add click event to marker
      el.addEventListener('click', () => {
        if (!map.current) return;
        
        // Fly to center
        map.current.flyTo({
          center: [lng, lat],
          zoom: 15,
          essential: true
        });
      });
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);
    });
    
    // Add global function to navigate to center details
    window.navigateToCenter = (centerId: string) => {
      navigate(`/locations/${centerId}`);
    };
    
    // Cleanup
    return () => {
      delete window.navigateToCenter;
    };
  }, [centers, navigate]);
  
  // Add center to user location button
  const handleCenterToUserLocation = () => {
    if (!map.current || !userLocation) return;
    
    map.current.flyTo({
      center: userLocation,
      zoom: 13,
      essential: true
    });
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {userLocation && (
        <Button
          variant="outline"
          className="absolute bottom-6 right-4 z-10 bg-white shadow-md"
          onClick={handleCenterToUserLocation}
        >
          <Locate className="h-5 w-5 mr-2" />
          Ma position
        </Button>
      )}
    </div>
  );
};

// Add type definition for window
declare global {
  interface Window {
    navigateToCenter: (centerId: string) => void;
  }
}

export default Map;
