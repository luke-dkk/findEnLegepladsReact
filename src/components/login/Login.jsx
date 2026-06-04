import { useState } from "react";
import { login } from "../../../apiReader.js";
import { useNavigate } from "react-router";
import "./Login.css";
import { useAuth } from "../utils/useAuth";
import playgroundPhoto from "../../../public/findenlegepladsPhoto.jpg";

export default function Login() {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {const { name, value } = evt.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
try {
    const data = await login(credentials);
    setUser({
    email: data.email
    });
    navigate("/");
  } catch (error) {
    alert("brugernavn og password matcher ikke", error);
  }
};

  const handleRegisterClick = () => {
    navigate("/auth/register");
  };

  
  return (
    <div className="login-page">
  <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>

      <img
        className="login-image"
        src={playgroundPhoto}
        alt="Playground"
      />

      <input
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Kodeord"
      />

      <button type="submit">Login</button>

      <button
        className="register-link"
        type="button"
        onClick={handleRegisterClick}
      >
        Ny bruger? klik her
      </button>

    </form>
  </div>
</div>
  );
}