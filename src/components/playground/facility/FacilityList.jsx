export default function FacilityList({ facility }) {

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
