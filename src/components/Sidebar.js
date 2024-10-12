import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Adjust this import according to your project structure

const Sidebar = ({ isOpen, toggleSidebar, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?"); // Confirmation dialog
    if (confirmLogout) {
      try {
        await auth.signOut(); // Sign out from Firebase
        setIsAuthenticated(false); // Update authentication state
        toggleSidebar(); // Close the sidebar
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout error:", error); // Log any logout errors
      }
    }
  };

  return (
    <div className={`bg-gray-800 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} min-h-screen p-5 fixed top-0 left-0 w-64 z-50 shadow-lg`}>
      <h2 className="text-white text-2xl font-semibold mb-4">Menu</h2>
      <ul>
        {/* Workouts Section */}
        <li className="text-white font-semibold mb-2">Workouts:</li>
        <li>
          <Link to="/log-workout" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>Log Workout</Link>
        </li>
        <li>
          <Link to="/workout-logs" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>Workout Logs</Link>
        </li>
        {/* Goals Section */}
        <li className="text-white font-semibold mb-2 mt-4">Goals:</li>
        <li>
          <Link to="/set-goal" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>Set Goal</Link>
        </li>
        <li>
          <Link to="/goal-progress" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>Goal Progress</Link>
        </li>
        {/* Reminder Section */}
        <li className="text-white font-semibold mb-2 mt-4">Reminder:</li>
        <li>
          <Link to="/set-reminder" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>Set Reminder</Link>
        </li>
        <li>
          <Link to="/view-reminders" className="text-gray-300 hover:text-white block py-2 transition duration-200" onClick={toggleSidebar}>View Reminders</Link>
        </li>
        {/* Login/Logout Section */}
        <li className="block py-2 mt-4 transition duration-200">
          {isAuthenticated ? (
            <span onClick={handleLogout} className="text-red-500 hover:text-white cursor-pointer">Logout</span>
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-700" onClick={toggleSidebar}>Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
