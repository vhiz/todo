import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './login.css'


export default function Login() {
    const { login } = useContext(AuthContext)

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        username: "",
        password: "",

    })
    const [error, setError] = useState(null)


    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
        } catch (error) {
            setError(error.response.data)
        }
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <input type="text" className="login__input" placeholder="User name" name='username' onChange={handleChange} required />
                        </div>
                        <div className="login__field">
                            <input type="password" className="login__input" placeholder="Password" name='password' onChange={handleChange} required />
                        </div>
                        <button className="button login__submit" onClick={handleLogin}>
                            <span className="button__text">Log In Now</span>
                        </button>
                        {error && error}
                    </form>
                    <button className="button login__submit">
                        <span className="button__text">Register</span>
                    </button>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}
