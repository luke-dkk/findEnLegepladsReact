    import { NavLink, useNavigate } from "react-router";
    import "./header.css";
    import { logout } from "../../../apiReader";
    import { getCurrentUser } from "../utils/authService";
    const menuItems = [
      { label: "Playgrounds", to: "/" },
      { label: "Profil", to: "/profile" },
    ];

    export default function Header() {
        const navigate = useNavigate();
        const user = getCurrentUser();
        const handleLogout = () => {
        logout();
        navigate("/auth/login");
      };
      
      return (
        <div className="header-root">
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
              <li>{user?.email}</li>
                  <li>
                <button
                  className="top-menu__button"
                  onClick={handleLogout}
                  >
                  Log af
                  </button>
              </li>
            </ul>
          </nav>
        </header>
        </div>
      );
    }

