import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
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

    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData)
    .then((response) => {
        if(response.status !== 200){
            console.log(response)
            window.alert(response)
        }
        console.log(response)
        navigate("/login")
    })
    .catch((error) => {
        window.alert(error)
        console.log(error);
    })
  }

  console.log(formData);

  return (
    <>
      <h1>Sign Up:</h1>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label>Email:</label>
        <input id="email" type="email" onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" onChange={handleChange} />
        <label htmlFor="passwordConfirmation">Password confirmation:</label>
        <input id="passwordConfirmation" type="passwordConfirmation" onChange={handleChange} />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}