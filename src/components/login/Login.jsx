import { useState } from "react";
import { login } from "../../../apiReader.js";
import { useNavigate } from "react-router";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log("credentials: ", credentials);

    const data = await login(credentials);

    console.log(data);

    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}