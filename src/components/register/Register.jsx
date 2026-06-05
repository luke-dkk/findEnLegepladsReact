import { useState } from "react";
import { RegisterUser, login } from "../../../apiReader.js";
import { useNavigate } from "react-router";
import "./register.css";
export default function Register () {
const navigate = useNavigate();
const [credentials, setCredentials] = useState({parentName:'', password:'', confirmPassword:'', email:''});
const handleChange = (evt) => {
    const {name, value} = evt.target;
    setCredentials((prev)=> {return {...prev, [name]: value}});
}

const handleSubmit = async (evt) => {
    evt.preventDefault();
        if (credentials.password !== credentials.confirmPassword){
            alert("Dine passwords matcher ikke, prøv igen");
            return
        }
        try {
         await RegisterUser(credentials);

         const loginCredentials = {
            email: credentials.email,
            password: credentials.password
         }
         await login(loginCredentials);
         navigate("/");
        
  } catch (error) {
    alert("Registrering fejlede, prøv igen", error);
    
  }
}

const handleLoginClick = () => {
    navigate("/auth/login");
}

    return (
  <div className="register-page">
  <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        name="parentName"
        type="text"
        value={credentials.parentName}
        onChange={handleChange}
        placeholder="Skriv dit navn"
      />

      <input
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Skriv password"
      />

      <input
        name="confirmPassword"
        type="password"
        value={credentials.confirmPassword}
        onChange={handleChange}
        placeholder="Bekræft dit password"
      />

      <input
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Skriv email"
      />

      <button type="submit">Register</button>

      <button type="button" onClick={handleLoginClick}>
        Tilbage til Login
      </button>
    </form>
  </div>
  </div>
);
}
