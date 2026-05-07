/**
 * Map preview component.
 * Tile provider:
 *   - If VITE_MAPTILER_KEY is set → MapTiler Streets v2 tiles (high quality, no attribution limit)
 *   - Otherwise → OpenStreetMap public tiles (fine for dev / small traffic)
 *
 * Geocode button (on Location tab) calls Nominatim — see AddProperty/PropertyEdit.
 */
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix Vite bundler icon resolution
const DefaultIcon = L.icon({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowSize:  [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// ─── Tile configuration ────────────────────────────────────────────────────────
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string | undefined;

const tileConfig = MAPTILER_KEY
  ? {
      url: `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
      attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  : {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };

// ─── Sub-component: recentre when coords change ────────────────────────────────
function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng]); }, [map, lat, lng]);
  return null;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface CRMMapPreviewProps {
  latitude?: number | null;
  longitude?: number | null;
  label?: string;
  height?: number;
  zoom?: number;
}

export default function CRMMapPreview({
  latitude,
  longitude,
  label = 'Property location',
  height = 280,
  zoom = 15,
}: CRMMapPreviewProps) {
  const valid = typeof latitude === 'number' && typeof longitude === 'number'
    && isFinite(latitude) && isFinite(longitude);

  if (!valid) {
    return (
      <div
        style={{ height }}
        className="flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
      >
        <MapPin className="w-6 h-6" />
        <p className="text-xs">Enter coordinates to preview the map</p>
      </div>
    );
  }

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 z-0">
      <MapContainer
        center={[latitude!, longitude!]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer url={tileConfig.url} attribution={tileConfig.attribution} />
        <Marker position={[latitude!, longitude!]}>
          <Popup>{label}</Popup>
        </Marker>
        <Recenter lat={latitude!} lng={longitude!} />
      </MapContainer>
    </div>
  );
}
