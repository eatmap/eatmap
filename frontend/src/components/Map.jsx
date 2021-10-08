import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useContext } from 'react';

import { RestaurantSearchContext } from '../providers/RestaurantsContext';

function ChangeCenterView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function MyMapComponent() {
  const { longitude, latitude } = useContext(RestaurantSearchContext);

  const center = [latitude, longitude];

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
      <ChangeCenterView center={center} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMapComponent;
