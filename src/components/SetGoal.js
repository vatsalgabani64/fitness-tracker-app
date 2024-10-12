import { useState } from "react";
import { firestore, auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const SetGoal = () => {
  const [weeklyWorkouts, setWeeklyWorkouts] = useState("");
  const [caloriesToBurn, setCaloriesToBurn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to set a goal.");
      return;
    }

    try {
      const userGoalRef = doc(firestore, "goals", user.uid);
      // Convert input values to numbers before saving to Firestore
      await setDoc(userGoalRef, {
        weeklyWorkouts: Number(weeklyWorkouts), // Convert to number
        caloriesToBurn: Number(caloriesToBurn), // Convert to number
      });
      alert("Goal set successfully!");
      setWeeklyWorkouts(""); // Clear input fields
      setCaloriesToBurn("");
    } catch (error) {
      alert("Error setting goal. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Set Your Workout Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={weeklyWorkouts}
          onChange={(e) => setWeeklyWorkouts(e.target.value)}
          placeholder="Weekly Workouts Goal"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          value={caloriesToBurn}
          onChange={(e) => setCaloriesToBurn(e.target.value)}
          placeholder="Calories to Burn Goal"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Set Goal
        </button>
      </form>
    </div>
  );
};

export default SetGoal;
