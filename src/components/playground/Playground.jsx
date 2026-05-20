import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import playGroundApiFacade from '../.././Api/ApiFacade'



export default function Playground(){
    let params = useParams();

    const [playground, setPlayground] = useState(null);
    const [facility, setFacility] = useState([]);

    useEffect(() => {
  (async () => {
    const playgroundFromServer = await playGroundApiFacade.getPlaygroundById(params.id);
    setPlayground(playgroundFromServer);
    setFacility(playgroundFromServer.facility)
  })();
},[]);

if (!playground) {
    return <div> Loading playground...</div>
}
    return (
    <> 
    <h1> playground name: {playground.name}</h1>
    <h3> playground id: {playground.id}</h3>
    <FacilityList facility={facility} />
    <h3>Here you can find more information about the playground</h3>
    </> 
    )
}

function FacilityList({ facility }) {
  return (
    <ul>
      {facility.map((fac) => (
        <li key={fac.id}>{fac.name}</li>
      ))}
    </ul>
  );
}