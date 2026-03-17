import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in react-leaflet when using Webpack/Vite
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export function Map() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let DefaultIcon = L.icon({
      iconUrl,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-muted animate-pulse rounded-2xl flex items-center justify-center text-muted-foreground">
        Cargando mapa...
      </div>
    );
  }

  // Coordinates for Calle 659 e/12 y 13 - Villa Garibaldi, La Plata
  const position: [number, number] = [-34.993186, -57.855613];
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border z-0 relative">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="font-display font-semibold">Delegación Comunal</div>
            <div className="text-sm">Villa Garibaldi - Parque Sicardi</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
