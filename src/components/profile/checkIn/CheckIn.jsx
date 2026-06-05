import {useState, useEffect} from "react";
import {getActiveCheckIns} from "../../../apiReader";
import "./CheckIn.css";
export default function CheckIn({user, refresh}) {
  const [activeCheckIns, setActiveCheckIns] = useState([]);

 useEffect(() => {
    const fetchCheckInStatus = async () => {
      const result = await getActiveCheckIns(user.id);
      setActiveCheckIns(result);
      console.log("user:", user);
      console.log("result:", result);
    }
    fetchCheckInStatus();
  }, [user.id, refresh]);

  return (
    <div className="check-in-container">
  <h2>Aktive check-ins</h2>

  <div className="active-checkins">
    <p>Her kan du se alle aktive check-ins for dine børn.</p>

    {activeCheckIns.length > 0 ? (
      activeCheckIns.map((checkIn) => (
        <div className="checkin-card" key={checkIn.id}>
          <h3>Legeplads #{checkIn.playground_id}</h3>

         <p>
  <strong>
    {checkIn.children.length > 1 ? "Børn" : "Barn"}:
  </strong>{" "}
  {checkIn.children.map(child => child.name).join(", ")}
</p>       
          <p>
            <strong>Checket ind:</strong>{" "}
            {new Date(
              checkIn.check_in[0],
              checkIn.check_in[1] - 1,
              checkIn.check_in[2],
              checkIn.check_in[3],
              checkIn.check_in[4]
            ).toLocaleString("da-DK")}
          </p>
        </div>
      ))
    ) : (
      <p>Ingen aktive check-ins.</p>
    )}
  </div>
</div>
  );
}