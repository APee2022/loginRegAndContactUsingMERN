import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../Pages/Login.css";
import { toast } from "react-toastify";

const URL = "http://localhost:3000/api/auth/login";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // we are not using default while exporting useAuth so we have to use {},( {storeTokenInLocalStorage})
  const { storeTokenInLocalStorage } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call, validation, etc.)
    // alert(formData);
    console.log("Form submitted with data:", formData);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        // alert("login successfull");
        toast.success("Login Successfull");
        storeTokenInLocalStorage(res_data.token);

        setFormData({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.message);
        console.log("invalid credential");
      }

      console.log(response);
    } catch (error) {
      console.log("login err", error);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
