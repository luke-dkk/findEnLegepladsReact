import { useParams } from "react-router";
import { useEffect, useState } from "react";
import playGroundApiFacade from "../../Api/ApiFacade";
import { attachFacilityToPlayground} from "../../../apiReader";
import "./Playground.css";

export default function Playground() {

  const params = useParams();

  const [playground, setPlayground] = useState(null);
  const [facility, setFacility] = useState([]);

  const [showAddFacility, setShowAddFacility] =
    useState(false);

  const [allFacilities, setAllFacilities] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {

    (async () => {

      const playgroundFromServer =
        await playGroundApiFacade
          .getPlaygroundById(params.id);

      setPlayground(playgroundFromServer);

      setFacility(
        playgroundFromServer.facility || []
      );

    })();

  }, [params.id]);



  async function handleOpenFacilityMenu() {

    setShowAddFacility(true);

    try {

      const facilities =
        await playGroundApiFacade
          .getAllFacilities();

      setAllFacilities(facilities);

    } catch (error) {

      console.error(
        "Error fetching facilities:",
        error
      );

    }
  }



  function handleCloseFacilityMenu() {

    setShowAddFacility(false);

    setSearchTerm("");

  }

async function submitFacility() {

  setShowAddFacility(false);

  const selectedFacility =
    allFacilities.find(
      fac =>
        fac.name.toLowerCase() ===
        searchTerm.toLowerCase()
    );

  if (!selectedFacility) {
    return;
  }

  await attachFacilityToPlayground(
    params.id,
    selectedFacility.id
  );

  const alreadyExists =
    facility.some(
      fac => fac.id === selectedFacility.id
    );

  if (alreadyExists) {
    return;
  }

  setFacility([
    ...facility,
    selectedFacility
  ]);

  setSearchTerm("");
}



  const filteredFacilities =
    allFacilities.filter((fac) =>
      fac.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );



  if (!playground) {
    return (
      <div className="loading">
        Loading playground...
      </div>
    );
  }



  return (

    <div className="playground-container">

      <div className="playground-header">

        <h1>{playground.name}</h1>

        <p className="playground-id">
          Playground ID: {playground.id}
        </p>

      </div>



      <div className="playground-section">

        <div className="facility-header">

          <h2>Facilities</h2>

          <button
            className="add-facility-button"
            onClick={handleOpenFacilityMenu}
          >
            Tilføj
          </button>

        </div>



        <FacilityList facility={facility} />



        {showAddFacility && (

          <div className="add-facility-form">

            <h3>Tilføj facilitet</h3>

            <input
              type="text"
              placeholder="Søg facilitet..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />



            <ul className="facility-search-list">

              {filteredFacilities.map((fac) => (

                <li
                  key={fac.id}
                  className="facility-search-item"
                  onClick={() =>
                    setSearchTerm(
                      fac.name
                      
                    )
                  }
                >
                  {fac.name}
                </li>

              ))}

            </ul>

            <button className="add-facility-button" onClick={submitFacility}>Tilføj facilitet</button>
            <button
              className="cancel-button"
              onClick={handleCloseFacilityMenu}
            >
              Fortryd
            </button>

          </div>

        )}

      </div>



      <div className="playground-section">

        <h2>Information</h2>

        <p className="playground-description">
          Here you can find more information
          about the playground.
        </p>

      </div>

    </div>

  );
}



function FacilityList({ facility }) {

  if (!facility || facility.length === 0) {
    return <p>No facilities registered.</p>;
  }

  return (

    <ul className="facility-list">

      {facility.map((fac) => (

        <li
          className="facility-item"
          key={fac.id}
        >
          {fac.name}
        </li>

      ))}

    </ul>

  );
}