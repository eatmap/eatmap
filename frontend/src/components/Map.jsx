import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import { useContext } from 'react';

import { RestaurantSearchContext } from '../providers/RestaurantsContext';

function ChangeCenterView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function MyMapComponent() {
  const { longitude, latitude, restaurants, radius } = useContext(
    RestaurantSearchContext,
  );

  const center = [latitude, longitude];

  const LeafIcon = Icon.extend({
    options: {},
  });

  const RedIcon = new LeafIcon({
    iconUrl:
      'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
  });

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
      {latitude && longitude && (
        <Marker position={center} icon={RedIcon}>
          <Popup>Search Location</Popup>
        </Marker>
      )}
      <Circle
        center={center}
        pathOptions={{ fillColor: 'red', fillOpacity: 0.1, stroke: false }}
        radius={radius * 1000}
      />
    </MapContainer>
  );
}

export default MyMapComponent;
