import './PlaygroundList.css';
import { useState, useEffect } from 'react';
import { getPlaygroundsNearLocation } from '../../apiReader';
import { useNavigate } from 'react-router';
import PlaygroundsMap from './playgroundsMap/PlaygroundsMap.jsx';

function PlaygroundList({ playgrounds }) {

  const nav = useNavigate();

  const [userLocation, setUserLocation] =
    useState(null);

  const [sortedPlaygrounds, setSortedPlaygrounds] =
    useState(playgrounds);

  const [page, setPage] = useState(0);

  const [loadingMore, setLoadingMore] =
    useState(false);

  /*
    Get user location
  */

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

      },

      (error) => {
        console.error(
          "Error getting location:",
          error
        );
      }

    );

  }, []);




  async function fetchPlaygrounds(
    pageToLoad = 0
  ) {

    if (!userLocation) return;

    try {

      const playgroundsFromServer =
        await getPlaygroundsNearLocation(
          userLocation.lat,
          userLocation.lng,
          2500,
          pageToLoad
        );

      if (pageToLoad === 0) {

        setSortedPlaygrounds(
          playgroundsFromServer
        );

      }



      else {

        setSortedPlaygrounds(prev => {

          const merged = [
            ...prev,
            ...playgroundsFromServer
          ];



          return merged.filter(
            (playground, index, self) =>
              index ===
              self.findIndex(
                p => p.id === playground.id
              )
          );
        });

      }

    } catch (error) {

      console.error(
        "Error fetching nearby playgrounds:",
        error
      );

    }
  }




  useEffect(() => {

    if (!userLocation) return;

    fetchPlaygrounds(0);

  }, [userLocation]);




  async function handleLoadMore() {

    setLoadingMore(true);

    const nextPage = page + 1;

    await fetchPlaygrounds(nextPage);

    setPage(nextPage);

    setLoadingMore(false);
  }



  function handleMarkerClick(playgroundId) {

    const clickedPlayground =
      sortedPlaygrounds.find(
        p => p.id === playgroundId
      );

    if (!clickedPlayground) return;

    const remainingPlaygrounds =
      sortedPlaygrounds.filter(
        p => p.id !== playgroundId
      );

    setSortedPlaygrounds([
      clickedPlayground,
      ...remainingPlaygrounds
    ]);
  }


  function HandlePlaygroundClick(
    playground
  ) {

    console.log(
      "You have clicked on playground:",
      playground.id
    );

    nav(`/playground/${playground.id}`);
  }



  if (
    !sortedPlaygrounds ||
    sortedPlaygrounds.length === 0
  ) {

    return <h1>Legepladser bliver hentet</h1>;
  }



  return (

    <>

      <PlaygroundsMap
        userLocation={userLocation}
        playgrounds={sortedPlaygrounds}
        onMarkerClick={handleMarkerClick}
      />




      <div className="load-more-container">

        <button
          className="load-more-button"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >

          {loadingMore
            ? "Loading..."
            : "Load 15 more playgrounds"}

        </button>

      </div>



      <div className="playgrounds">

        {sortedPlaygrounds.map(
          (playground) => {

            return (

              <div
                key={playground.id}
                className="playground-card"
                onClick={() =>
                  HandlePlaygroundClick(
                    playground
                  )
                }
              >

                <h3>
                  {playground.name}
                </h3>



                {playground.distance < 1000 ? (

                  <p>

                    <strong>
                      
                      Afstand:
                    </strong>{" "}

                    {playground.distance.toFixed(
                      0
                    )}{" "}
                    m

                  </p>

                ) : (

                  <p>

                    <strong>
                      Afstand:
                    </strong>{" "}

                    {(
                      playground.distance / 1000
                    ).toFixed(2)}{" "}
                    km

                  </p>

                )}




                {playground.checked_in_children !== null && (

                  <p>
                    <strong>
                      Børn tjekket ind:
                    </strong>{" "}

                    {playground.checked_in_children}

                  </p>

                )}

                



                <a
                  href={`https://www.google.com/maps?q=${playground.latitude},${playground.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on map
                </a>

              </div>

            );
          }
        )}

      </div>

    </>

  );
}

export default PlaygroundList;