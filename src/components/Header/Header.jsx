import { NavLink, useNavigate } from "react-router";
import "./header.css";
import { logout } from "../../../apiReader";



const menuItems = [
  { label: "Playgrounds", to: "/" },
  { label: "Profil", to: "/profile" },
];




export default function Header({ user }) {
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate("/auth/login");

  };
  return (
    <header className="top-menu" role="banner">
      <nav aria-label="Main navigation" className="top-menu__nav">
        <ul className="top-menu__list">
          {menuItems.map((item) => (
            <li className="top-menu__item" key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  `top-menu__link${isActive ? " top-menu__link--active" : ""}`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>{user.username}</li>
               <li>
            <button
               className="top-menu__button"
               onClick={handleLogout}
              >
              logout
              </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

