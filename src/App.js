import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LogWorkout from "./components/LogWorkout";
import SetGoal from "./components/SetGoal";
import GoalProgress from "./components/GoalProgress";
import SetReminder from "./components/SetReminder";
import ViewReminders from "./components/ViewReminders";
import WorkoutLogs from "./components/WorkoutLogs";
import Login from "./components/Login"; 
import Logout from "./components/Logout"; 
import { auth } from "./firebaseConfig"; 
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Function to toggle sidebar
  };

  return (
    
    <Router>
      <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isOpen={isOpen} toggleSidebar={toggleSidebar}>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> 
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/log-workout" element={<LogWorkout />} />
          <Route path="/set-goal" element={<SetGoal />} />
          <Route path="/goal-progress" element={<GoalProgress />} />
          <Route path="/set-reminder" element={<SetReminder />} />
          <Route path="/view-reminders" element={<ViewReminders />} />
          <Route path="/workout-logs" element={<WorkoutLogs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
