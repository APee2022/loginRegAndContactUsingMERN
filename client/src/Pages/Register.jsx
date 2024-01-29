import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../Pages/Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
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
    // Add your registration logic here (e.g., API call, validation, etc.)
    // alert(formData);
    console.log("Form submitted with data:", formData);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.message);

      if (response.ok) {
        storeTokenInLocalStorage(res_data.token);

        setFormData({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successfully");
        navigate("/");
      } else {
        // alert(res_data.message);
        toast.error(res_data.message);
      }

      console.log(response);
    } catch (error) {
      console.log("register err", error);
    }
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            id="username"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            id="email"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="number"
            name="phone"
            value={formData.phone}
            id="phone"
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
            id="password"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
