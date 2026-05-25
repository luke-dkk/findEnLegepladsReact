import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const playgroundIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/14762/14762907.png',

  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
const userIcon = new L.Icon({
  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/684/684908.png',

  iconSize: [30, 30],
  iconAnchor: [15, 30],
});


export default function PlaygroundsMap({
  userLocation,
  playgrounds,
  onMarkerClick
}) {

  if (!userLocation) {
    return <p>Loading map...</p>;
  }

  return (

    <MapContainer
      center={[
        userLocation.lat,
        userLocation.lng
      ]}
      zoom={16}
      style={{
        height: '500px',
        width: '100%'
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />



      

      <Marker
        position={[
          userLocation.lat,
          userLocation.lng
        ]}
        icon={userIcon}
      >
        <Popup>
          Your location
        </Popup>
      </Marker>



      

      {playgrounds.map((playground) => (

    <Marker
  key={playground.id}
  position={[
    playground.latitude,
    playground.longitude
  ]}
  icon={playgroundIcon}

  eventHandlers={{
    click: () =>
      onMarkerClick(playground.id)
  }}
>

          <Popup>

            <strong>
              {playground.name}
            </strong>

            <br />

            {playground.distance &&
              `${Math.round(
                playground.distance
              )} meter væk`
            }

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );
}