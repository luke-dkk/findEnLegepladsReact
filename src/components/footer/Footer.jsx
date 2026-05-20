import { logout } from "../../apiReader";
import { useNavigate } from "react-router";

export default function Footer() {

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/auth/login");
  };

  return (
    <footer>

      <button onClick={handleLogout}>
        Logout
      </button>

    </footer>
  );
}