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
      <h1 className="font-bold text-xl">Sign Up:</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center items-center h-screen m-4 p-2">
        <label htmlFor="email"  className="text-md font-semibold my-2" >Email:</label>
        <input id="email" type="email" className="border border-2 border-slate-500 p-2 rounded my-2" onChange={handleChange} />
        <label htmlFor="password" className="text-md font-semibold my-2" >Password:</label>
        <input id="password" type="password" className="border border-2 border-slate-500 p-2 rounded my-2" onChange={handleChange} />
        <label htmlFor="passwordConfirmation" className="text-md font-semibold my-2" >Password confirmation:</label>
        <input id="passwordConfirmation" type="passwordConfirmation" className="border border-2 border-slate-500 p-2 rounded my-2" onChange={handleChange} />
        <button type="submit" className="px-6 py-2 border rounded-md border-2 border-blue-700 bg-blue-500  hover:border-blue-800 hover:bg-blue-600 w-fit font-bold text-white">Sign up</button>
      </form>
    </>
  );
}