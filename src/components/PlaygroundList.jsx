import './PlaygroundList.css';
import { useState, useEffect } from 'react';
import { getPlaygroundsNearLocation} from '../../apiReader';
import { useNavigate } from 'react-router';


function PlaygroundList({playgrounds}) {
const nav = useNavigate();
const [userLocation, setUserLocation] = useState(null);
const [sortedPlaygrounds, setSortedPlaygrounds] = useState(playgrounds);

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

useEffect(() => {

  if (!userLocation) return;

  (async () => {
    try {
      const playgroundsFromServer =
        await getPlaygroundsNearLocation(
          userLocation.lat,
          userLocation.lng,
          2500,
          0
        );

      setSortedPlaygrounds(playgroundsFromServer);

    } catch (error) {
      console.error("Error fetching nearby playgrounds:", error);
    }
  })();

}, [userLocation]);


  function HandlePlaygroundClick(playground){
    console.log("You have clikcked on playground: " + playground.id) 
    nav(`/playground/${playground.id}`)
  }

  if (!sortedPlaygrounds || sortedPlaygrounds.length === 0) {
    return <h1>Playgrounds are loading</h1>;
  }

  return (
    <div className="playgrounds">
      {sortedPlaygrounds.map((playground) => {

        return (
          <div 
          key={playground.id} 
          className="playground-card"
          onClick={() => HandlePlaygroundClick(playground)}
          > 
          

     <h3>{playground.name}</h3>

{playground.distance < 1000 ? (
  <p>
    <strong>Distance:</strong>{" "}
    {playground.distance.toFixed(0)} m
  </p>
) : (
  <p>
    <strong>Distance:</strong>{" "}
    {(playground.distance / 1000).toFixed(2)} km
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
        // lav button der viser et lille overlay:
        //      <button
        //className="edit-button"
       // onClick={() => setShowEditOverlay(true)}
      //>
       //</div> Edit Profile
      //</button>

      // <button onClick={() => setShowEditOverlay(false)}>
        //      Close
        //    </button>

      })}
    </div>
  );
}

export default PlaygroundList;


