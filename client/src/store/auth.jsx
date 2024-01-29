/**
 In React, the "context" is a feature that allows you to share state data between components
 without explicitly passing the data through each level of the component tree. It's a way to 
 manage global state or share data between components that are not directly connected.
 */

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken); // if we not write this line we can't get logout button
    // while we log in, to get log out button we have to refresh the page, but while adding
    // this line we get our logout button without refreshing the page
    // this is because our setToken value become true
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; // this line of code means if value of token is true than
  // isLoggedIn is true and if false than false
  console.log("isLoggedIn", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // jwt Authentication to get the currently user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.log("Error fetching user data");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLocalStorage, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
/**
  The Provider component is responsible for "providing" the data (context) to it's
  descendants(vanshaj)
  */

// create a custom hook
export const useAuth = () => {
  const authcontextValue = useContext(AuthContext);
  if (!authcontextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authcontextValue;
};

// useAuth Function now contains the value provided by the
// AuthContext.Provider higher up in the component tree
