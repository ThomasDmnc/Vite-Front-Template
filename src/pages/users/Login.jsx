import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {
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
        if (formData.password !== formData.passwordConfirmation) {
          alert("Passwords do not match");
          return;
        }
    
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)
        .then((response) => {
            if(response.status !== 200){
                console.log(response)
                window.alert(response)
            }
            console.log(response)
            navigate("/")
        })
        .catch((error) => {
            window.alert(error)
            console.log(error);
        })
      }
  return (
    <>
      <h1>Log in:</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label>Email:</label>
        <input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={handleChange} />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
