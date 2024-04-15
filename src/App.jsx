import { useState } from 'react';
import {Routes, Route} from "react-router-dom"
import SignUp from './pages/users/Signup'
import Login from './pages/users/Login'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={<SignUp/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
      </Routes>
     
    </>
  )
}

export default App
