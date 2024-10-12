// src/components/Logout.js
import React, { useEffect } from "react";
import { auth } from "../firebaseConfig"; // Adjust the import based on your project structure
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth.signOut(); // Log out the user
        setIsAuthenticated(false); // Update the authentication state
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout(); // Call the logout function when component mounts
  }, [navigate, setIsAuthenticated]);

  return null; // No UI to render for logout
};

export default Logout;
