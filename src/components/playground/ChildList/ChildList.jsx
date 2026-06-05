
import { checkin } from "../../../../apiReader";
import { useState, useEffect } from "react";
import { getActiveCheckIns } from "../../../../apiReader";
import "./ChildList.css";

export default function ChildList({ user, playground, closeCheckIn }) {
 const [ListOfChildrenCheckIn, setListOfChildrenCheckIn] = useState([]);
 const [alreadyCheckedInChildren, setAlreadyCheckedInChildren] = useState([]);
 const [uselessCounter, setUselessCounter] = useState(0);

useEffect(() => {
  async function loadCheckIns() {
    try {
      const activeCheckIns =
        await getActiveCheckIns(user.id);
      console.log("activeCheckIns", activeCheckIns);
      setAlreadyCheckedInChildren(activeCheckIns);
    } catch (error) {
      console.error(error);
    }
  }
  if (user?.id) {
    loadCheckIns();
  }
}, [user , uselessCounter]);

useEffect(() => {
  console.log(
    "alreadyCheckedInChildren",
    alreadyCheckedInChildren
  );
}, [alreadyCheckedInChildren]);

  if (!user.children || user.children.length === 0) {
    return <p>Ingen børn registreret.</p>;
  }

  function handleChildClick(child) {
    setListOfChildrenCheckIn(prev =>
      prev.some(c => c.id === child.id)
        ? prev.filter(c => c.id !== child.id)
        : [...prev, child]
    );
  }

async function submitCheckIn() {
  if (ListOfChildrenCheckIn.length === 0) {
    alert("Vælg mindst ét barn for at checke ind.");
    return;
  }
  const childIds = ListOfChildrenCheckIn.map(
    (child) => child.id
  );

  try {
    const response = await checkin(
      playground.id,
      user.id,
      childIds
    );

    console.log("Check-in response:", response);

    alert("Check-in lykkedes!");
    setListOfChildrenCheckIn([]);

    console.log(
      "Check-in successful, cleared selected children.",
      response.message
    );
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
  setUselessCounter(prev => prev + 1);
}

  return (
    <>
   <ul className="playground-child-list">
  {user.children.map((child) => {

    const isSelected =
      ListOfChildrenCheckIn.some(
        c => c.id === child.id
      );
      
    const isAlreadyCheckedIn =
      alreadyCheckedInChildren.some(checkIn =>
        checkIn.children.some(
          checkedChild => checkedChild.id === child.id
        )
      );

    return (
   <li
  key={child.id}
  className={`playground-child-item
    ${!isAlreadyCheckedIn && isSelected ? "selected" : ""}
    ${isAlreadyCheckedIn ? "checked-in" : ""}
  `}
  data-tooltip="Child is already checked in"
  onClick={() => {
    if (!isAlreadyCheckedIn) {
      handleChildClick(child);
    }
  }}
>
  {child.name}
</li>
    );
  })}
</ul>
    <button className="check-in-button" onClick={submitCheckIn}>Godkend check ind</button>
    <button className="cancel-button" onClick={() => closeCheckIn()}>Fortryd</button>
    </>
  );
}

