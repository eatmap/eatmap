import { MapContainer, TileLayer } from 'react-leaflet';
import { useContext } from 'react';

import { RestaurantSearchContext } from '../providers/RestaurantsContext';

function MyMapComponent() {
  const { longitude, latitude } = useContext(RestaurantSearchContext);
  return (
    <MapContainer center={[latitude, longitude]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMapComponent;
