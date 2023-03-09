import { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    passwordAgain: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.passwordAgain) {
      setError("password does not match");
    } else {
      const user = {
        username: inputs.username,
        password: inputs.password,
      };

      try {
        await axios.post("http://localhost:3002/api/users/register", user);
        navigate("/login");
      } catch (error) {
        setError(error.response.data);
      }
    }
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                placeholder="User name"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                placeholder="Password Again"
                name="passwordAgain"
                onChange={handleChange}
                required
              />
            </div>
            <button className="button login__submit" onClick={handleClick}>
              <span className="button__text">Register</span>
            </button>
            <span className="error">{error && error}</span>
          </form>
          <button className="button login__submit">
            <Link to={"/login"}>
              <span className="button__text">Login</span>
            </Link>
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
  );
}
