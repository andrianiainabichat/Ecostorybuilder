'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Story } from '@/lib/types';
import type { Icon } from 'leaflet';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import { Award, MapPin } from 'lucide-react';

export default function MapView() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [customIcon, setCustomIcon] = useState<Icon | null>(null);

  useEffect(() => {
    // Import Leaflet dynamically only on client side
    import('leaflet').then((L) => {
      const icon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      setCustomIcon(icon);
    });

    // Fetch stories
    fetch('/api/stories')
      .then((res) => res.json())
      .then((data) => {
        setStories(data.stories || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stories:', error);
        setLoading(false);
      });
  }, []);

  if (loading || !customIcon) {
    return (
      <div className="h-full flex items-center justify-center bg-eco-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-700">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  const defaultCenter: [number, number] = [-18.8792, 47.5079];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stories.map((story) => (
        <Marker
          key={story.id}
          position={[story.latitude, story.longitude]}
          icon={customIcon}
        >
          <Popup maxWidth={300}>
            <div className="p-2">
              <h3 className="font-bold text-lg text-eco-dark mb-2">
                {story.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                {story.location_name}
              </div>
              <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                {story.content}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="bg-eco-light text-eco-dark px-2 py-1 rounded">
                  {story.theme}
                </span>
                <span className="flex items-center gap-1 text-eco-green font-semibold">
                  <Award className="w-4 h-4" />
                  {story.points} pts
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Par {story.author}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}