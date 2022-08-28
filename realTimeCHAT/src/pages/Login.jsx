import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cactus from "../assets/register-cactus.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/Routes";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        password,
        username,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Username and Password are required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username and Password are required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={cactus} alt="" />
          <h1>chatty appy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          min={3}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to="/register"> Register</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};
export default Login;
