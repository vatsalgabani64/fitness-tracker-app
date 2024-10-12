import React from "react";
import { FaBars } from "react-icons/fa"; // Import hamburger icon
import { Link } from "react-router-dom"; // Import Link

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between shadow-lg">
      <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
        <FaBars />
      </button>
      <h1 className="text-white text-xl flex-grow text-center font-semibold">Fitness Tracker</h1>
      {/* Removed logout from here */}
    </nav>
  );
};

export default Navbar;
