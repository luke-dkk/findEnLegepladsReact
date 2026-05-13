import './PlaygroundList.css';
import { useState, useEffect } from 'react';


function PlaygroundList({playgrounds}) {

const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);


    const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  const sortedPlaygrounds = userLocation
    ? [...playgrounds].sort((a, b) => {
        const distA = getDistance(
          userLocation.lat,
          userLocation.lng,
          a.latitude,
          a.longitude
        );
        const distB = getDistance(
          userLocation.lat,
          userLocation.lng,
          b.latitude,
          b.longitude
        );
        return distA - distB;
      })
    : playgrounds;

  return (
    <div className="playgrounds">
      {sortedPlaygrounds.map((playground) => {
        const distance =
          userLocation &&
          getDistance(
            userLocation.lat,
            userLocation.lng,
            playground.latitude,
            playground.longitude
          );

        return (
          <div key={playground.id} className="playground-card">
            <h3>{playground.name}</h3>

            {distance && (
              <p>
                {distance.toFixed(2)} km væk
              </p>
            )}

            {playground.capacity !== null && (
              <p>
                <strong>Capacity:</strong> {playground.capacity}
              </p>
            )}

            <a
              //href={`https://www.google.com/maps?q=${playground.name},${playground.latitude},${playground.longitude}`}
              href={`https://www.google.com/maps?q=${playground.latitude},${playground.longitude}`}
              //href={`https://www.google.com/maps?q=${playground.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on map
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default PlaygroundList;


