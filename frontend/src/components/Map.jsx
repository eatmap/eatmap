import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';

import { RestaurantSearchContext } from '../providers/RestaurantsContext';

function ChangeCenterView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function MyMapComponent() {
  const { longitude, latitude, restaurants } = useContext(
    RestaurantSearchContext,
  );

  const center = [latitude, longitude];

  const markers = restaurants.map(({ id, name, location }) => {
    const { lat, lng } = location;
    return (
      <Marker position={[lat, lng]} key={id}>
        <Popup>{name}</Popup>
      </Marker>
    );
  });

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={true}>
      <ChangeCenterView center={center} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}

export default MyMapComponent;
