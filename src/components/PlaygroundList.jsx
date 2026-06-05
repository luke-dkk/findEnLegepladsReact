import './PlaygroundList.css';
import { useState, useEffect } from 'react';
import { getPlaygroundsNearLocation } from '../../apiReader';
import { useNavigate } from 'react-router';
import PlaygroundsMap from './playgroundsMap/PlaygroundsMap.jsx';

function PlaygroundList() {

  const nav = useNavigate();
  const [playgrounds] = useState([]);
  const [page, setPage] = useState(0);
  const [userLocation, setUserLocation] =
    useState(null);
  const [sortedPlaygrounds, setSortedPlaygrounds] =
    useState(playgrounds);
  const [loadingMore, setLoadingMore] =
    useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        alert(
          "Kunne ikke hente din lokation. Sørg for at du har givet tilladelse til at dele din lokation, og prøv igen."
        );
        console.error(
          "Error getting location:",
          error
        );
      }
    );
  }, []);

   useEffect(() => {
    if (!userLocation) return;
    fetchPlaygrounds(0);
  }, [userLocation]);

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
    } 
    catch (error) 
    {
      console.error(
        "Error fetching nearby playgrounds:",
        error
      );
    }
  }

 
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
    <div className="playground-list-container">
          <h1 className="playground-list-title"> Find en Legeplads </h1>
  <p className="playground-list-subtitle"> Opdag legepladser nær dig og se hvor andre børn leger </p>
      <PlaygroundsMap
        userLocation={userLocation}
        playgrounds={sortedPlaygrounds}
        onMarkerClick={handleMarkerClick}
      />

      <div className="load-more-container">
        <button className="load-more-button"
          className="load-more-button"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore
            ? "Indhenter flere legepladser..."
            : "Indhent 15 legepladser til?"}
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
                <div className="playground-name">
                <h3>
                  {playground.name}
                </h3>
                </div>
                <div className="playground-info">
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
                {playground.currently_checked_in !== null && (
                  <p>
                    <strong>
                      Børn tjekket ind:
                    </strong>{" "}
                    {playground.currently_checked_in}
                  </p>
                )}
                <div className="playground-links">
                <a
                  href={`https://www.google.com/maps?q=${playground.latitude},${playground.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Åbn Kort
                </a>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.219 1.94299C16.872 2.45499 17.322 3.28199 17.506 4.14799L17.571 4.17399L19.616 5.11999C19.7302 5.17258 19.8271 5.25671 19.8951 5.36247C19.9631 5.46824 19.9995 5.59124 20 5.71699V18.084C19.9993 18.1867 19.9747 18.2879 19.9284 18.3796C19.882 18.4712 19.815 18.5509 19.7326 18.6123C19.6503 18.6737 19.5548 18.7152 19.4537 18.7336C19.3526 18.7519 19.2487 18.7466 19.15 18.718L13.481 17.118L6.741 18.976C6.61942 19.0096 6.49082 19.0082 6.37 18.972L0.474 17.217C0.337721 17.177 0.21799 17.094 0.132595 16.9805C0.047201 16.867 0.00069966 16.729 0 16.587L0 3.99799C0 3.55799 0.428 3.24199 0.855 3.36599L6.557 5.02699L9.455 4.13999C9.495 4.12799 9.53567 4.11966 9.577 4.11499C9.689 3.45899 10.002 2.82899 10.527 2.21499C11.15 1.48499 12.243 1.05699 13.308 1.00599C14.413 0.952994 15.257 1.18899 16.218 1.94199M1.333 4.88099V16.096L6.203 17.545V6.29799L1.333 4.88099ZM9.542 5.49499L7.536 6.10799V17.387L12.601 15.993V12.698C12.601 12.334 12.9 12.039 13.268 12.039C13.636 12.039 13.934 12.334 13.934 12.699V15.876L18.667 17.211V6.13599L17.547 5.61599C17.5283 5.72599 17.504 5.83366 17.474 5.93899C17.2574 6.70607 16.8925 7.42326 16.4 8.04999L13.923 11.143C13.8578 11.2243 13.7745 11.2893 13.6797 11.3328C13.585 11.3763 13.4814 11.397 13.3772 11.3934C13.273 11.3898 13.1711 11.362 13.0796 11.3121C12.9881 11.2622 12.9095 11.1916 12.85 11.106L10.535 7.75299C10.1523 7.22033 9.88533 6.74166 9.734 6.31699C9.63885 6.05122 9.57443 5.77542 9.542 5.49499ZM13.372 2.32399C12.646 2.35899 11.9 2.65099 11.545 3.06599C11.118 3.56599 10.908 4.03399 10.866 4.50799C10.816 5.07899 10.85 5.48199 10.992 5.88099C11.097 6.17599 11.306 6.54999 11.629 7.00099L13.44 9.62299L15.35 7.23799C15.7356 6.74571 16.0213 6.18283 16.191 5.58099C16.431 4.74099 16.069 3.50699 15.391 2.97699C14.696 2.43199 14.171 2.28499 13.373 2.32399M13.511 3.02099C14.615 3.02099 15.511 3.90599 15.511 4.99799C15.5076 5.52526 15.295 6.0296 14.92 6.40028C14.545 6.77095 14.0383 6.97765 13.511 6.97499C12.407 6.97499 11.511 6.08999 11.511 4.99799C11.511 3.90599 12.407 3.02099 13.511 3.02099ZM13.511 4.33899C13.4239 4.33847 13.3376 4.35509 13.257 4.38793C13.1763 4.42076 13.1029 4.46916 13.041 4.53035C12.9791 4.59154 12.9298 4.66434 12.896 4.74458C12.8622 4.82482 12.8445 4.91093 12.844 4.99799C12.844 5.36199 13.143 5.65699 13.511 5.65699C13.5981 5.65739 13.6844 5.64063 13.7649 5.60768C13.8455 5.57472 13.9188 5.52622 13.9807 5.46493C14.0425 5.40364 14.0917 5.33077 14.1254 5.25049C14.1591 5.1702 14.1766 5.08406 14.177 4.99699C14.1757 4.8215 14.1048 4.65369 13.98 4.53035C13.8551 4.40701 13.6865 4.33819 13.511 4.33899Z" fill="black"/>
                  </svg>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
export default PlaygroundList;