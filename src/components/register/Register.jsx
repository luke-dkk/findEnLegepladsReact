import { useState } from "react";
import { RegisterUser } from "../../../apiReader.js";
import { useNavigate } from "react-router";

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
            console.log("passwords do not match")
            return
        }
        console.log('credentials: ', credentials);
        const data = await RegisterUser(credentials);
        console.log(data);

        navigate("/")
}



    return(
    <>
    <form onSubmit={handleSubmit}>
        <input name ="parentName" type="text" value={credentials.parentName} onChange={handleChange} placeholder="skriv dit navn"/>
        <input name ="password" type="text" value={credentials.password} onChange={handleChange} placeholder="skriv password"/>
        <input name ="confirmPassword" type="text" value={credentials.confirmPassword} onChange={handleChange} placeholder="Bekraft dit password"/>
        <input name ="email" type="email" value={credentials.email} onChange={handleChange} placeholder="skriv Email"/>

        <button type="submit">Register Bruger</button>
    </form>
    </>
);
}
