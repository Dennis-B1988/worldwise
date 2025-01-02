import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../hooks/useCities';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useUrlPosition';
import Button from './Button';
import styles from './Map.module.css';

function Map() {
  const { cities } = useCities();
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
  const { lat: mapLat, lng: mapLng } = useUrlPosition();
  const [mapPosition, setMapPosition] = useState({ lat: 35, lng: 139 });

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition({ lat: parseFloat(mapLat), lng: parseFloat(mapLng) });
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) setMapPosition({ lat: geolocationPosition.lat, lng: geolocationPosition.lng });
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer className={styles.map} center={[mapPosition.lat, mapPosition.lng]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;
