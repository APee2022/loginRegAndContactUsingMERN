import React from "react";
import { NavLink } from "react-router-dom";
// The `<NavLink>` component in React Router is used for navigation.
// The `<NavLink>` renders as `<a>` tag when loaded on the DOM.
// This is very useful for linking pages that require an active state
// for example navbar, breadcrumbs, and list items with active class
//that shows which item is currently selected.

import "../components/Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/service">Services</NavLink>
        </li>
        {isLoggedIn ? (
          <li className="nav-item">
            <NavLink to="/logout">Logout</NavLink>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
