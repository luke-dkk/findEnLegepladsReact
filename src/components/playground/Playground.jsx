import { useParams } from "react-router";
import { useEffect, useState } from "react";
import playGroundApiFacade from "../../Api/ApiFacade";
import { attachAndCreateFacility} from "../../../apiReader";
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

  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    alert("Please select a facility to add.");
    return;
  }

  const existingFacility = allFacilities.find(
    fac => fac.name.toLowerCase() === normalizedSearch
  );

  const alreadyAttached = facility.some(
    fac => fac.name.toLowerCase() === normalizedSearch
  );

  if (alreadyAttached) {
    alert("Facility is already attached to the playground.");
    return;
  }



  try {
const newFacility = await attachAndCreateFacility(
        playground.id,
        searchTerm
      );
      console.log("Facility attached/created:", newFacility);
    if (!existingFacility) {
      setAllFacilities([...allFacilities, newFacility]);
      setFacility([...facility, newFacility]);
    } else {
      setFacility([...facility, existingFacility]);
    }

    setSearchTerm("");
  } catch (error) {
    alert("Failed to add facility., error: " + error.message);
  }
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
        Loader Legepladser
      </div>
    );
  }



  return (

    <div className="playground-container">

      <div className="playground-header">

        <h1>{playground.name}</h1>

        <p className="playground-id">
          Legeplads ID: {playground.id}
        </p>

      </div>



      <div className="playground-section">

        <div className="facility-header">

          <h2>Faciliteter</h2>

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
          Her kan du finde informationer om legepladsen.
        </p>

      </div>

    </div>

  );
}



function FacilityList({ facility }) {

  if (!facility || facility.length === 0) {
    return <p>Ingen faciliteter registreret.</p>;
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