import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cactus from "../assets/register-cactus.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/Routes";

const FormContainer = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("request", registerRoute);
      const { password, email, username } = values;
      const { data } = await axios.post(registerRoute, {
        password,
        email,
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
    const { password, confirm, username } = values;
    if (password !== confirm) {
      toast.error("Passwords should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be  greater than 3 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be greater than 6 characters", toastOptions);
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
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirm"
          onChange={handleChange}
        />
        <button type="submit">create user</button>
        <span>
          Already have an account ? <Link to="/login">Log In</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
};

export default FormContainer;
