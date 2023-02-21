import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import Home from './pages/Home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

export default function App() {

  const { currentUser } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
