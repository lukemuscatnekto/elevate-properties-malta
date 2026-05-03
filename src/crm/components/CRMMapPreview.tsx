// OpenStreetMap preview powered by Leaflet + react-leaflet.
// No API key, no paid tiles — tiles are fetched from openstreetmap.org.
//
// Marker icons are loaded from a CDN and configured manually so we don't depend
// on Vite's asset pipeline resolving Leaflet's bundled image URLs.

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default-icon path issue when bundled by Vite.
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface CRMMapPreviewProps {
  latitude?: number | null;
  longitude?: number | null;
  label?: string;
  height?: number;
  zoom?: number;
}

export const MALTA_CENTER: [number, number] = [35.9375, 14.3754];

// Helper child that re-centers the map when coordinates change.
function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  const lastRef = useRef<string>('');
  useEffect(() => {
    const key = position.join(',');
    if (key !== lastRef.current) {
      lastRef.current = key;
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

export default function CRMMapPreview({
  latitude,
  longitude,
  label,
  height = 280,
  zoom = 14,
}: CRMMapPreviewProps) {
  const lat = typeof latitude === 'number' && !Number.isNaN(latitude) ? latitude : null;
  const lng = typeof longitude === 'number' && !Number.isNaN(longitude) ? longitude : null;
  const hasCoords = lat != null && lng != null;

  if (!hasCoords) {
    return (
      <div
        className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-dashed border-slate-300 flex items-center justify-center text-sm text-slate-500 text-center px-4"
        style={{ height }}
      >
        Location preview will appear once coordinates are added.
      </div>
    );
  }

  const position: [number, number] = [lat as number, lng as number];

  return (
    <div style={{ height }} className="overflow-hidden">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {label && <Popup>{label}</Popup>}
        </Marker>
        <Recenter position={position} />
      </MapContainer>
    </div>
  );
}
