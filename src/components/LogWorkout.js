import { useState } from "react";
import { firestore, auth } from "../firebaseConfig"; // Import Firestore and Auth
import { collection, addDoc } from "firebase/firestore";

const workoutTypes = [
  "Running",
  "Cycling",
  "Swimming",
  "Weightlifting",
  "Yoga",
  "HIIT",
  "Pilates",
  "Dancing",
  "Hiking",
  "Walking",
  "Other", // Option for unspecified workout types
];

const LogWorkout = () => {
  const [workoutType, setWorkoutType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get current user
    if (!user) {
      alert("You must be logged in to log a workout.");
      return;
    }

    try {
      // Add workout to Firestore with userId
      await addDoc(collection(firestore, "workouts"), {
        userId: user.uid, // Save the user's ID
        type: workoutType,
        duration: duration,
        calories: calories,
        date: date,
        timestamp: new Date(), // Optional: Store the timestamp
      });
      alert("Workout logged successfully!");
      setWorkoutType(""); // Clear input fields
      setDuration("");
      setCalories("");
      setDate("");
    } catch (error) {
      alert("Error logging workout. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Log Your Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>Select Workout Type</option>
          {workoutTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories Burned"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
