// src/components/Dashboard.js
import React from "react";
import LogWorkout from "./LogWorkout";
import SetGoal from "./SetGoal";
import GoalProgress from "./GoalProgress";
import SetReminder from "./SetReminder";
import ViewReminders from "./ViewReminders";
import WorkoutLogs from "./WorkoutLogs";
import ProgressChart from "./ProgressChart";

const Dashboard = () => {
  return (
    <div>
      <h1>Fitness Dashboard</h1>
      <LogWorkout />
      <SetGoal />
      <GoalProgress />
      <SetReminder />
      <ViewReminders />
      <WorkoutLogs />
      <ProgressChart />
    </div>
  );
};

export default Dashboard;
