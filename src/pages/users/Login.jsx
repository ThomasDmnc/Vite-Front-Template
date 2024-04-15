import axios from "axios"
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

export default function Login() {
    const {authUser, storeToken} = useContext(AuthContext)

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, 
            JSON.stringify(formData),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": true, 
                }
            })
        .then((response) => {
            if(response.status !== 200){
                console.log(response)
                window.alert(response)
            }
            storeToken(response.data.token)
            authUser()
            console.log("Ca marche")
            navigate("/")
        })
        .catch((error) => {
            window.alert(error)
            console.log(error);
        })
      }
  return (
    <>
      <h1 className="font-bold text-xl">Log in:</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center h-screen m-4 p-2">
        <label htmlFor="email" className="text-md font-semibold my-2">Email:</label>
        <input id="email" type="email" onChange={handleChange} className="border border-2 border-slate-500 p-2 rounded my-2"/>
        <label htmlFor="password" className="text-md font-semiboldmy-2">Password:</label>
        <input id="password" type="password" onChange={handleChange} className="border border-2 border-slate-500 p-2 rounded my-2"/>
        <button type="submit" className="px-6 py-2 border rounded-md border-2 border-blue-700 bg-blue-500  hover:border-blue-800 hover:bg-blue-600 w-fit font-bold text-white">Log In</button>
      </form>
    </>
  );
}
