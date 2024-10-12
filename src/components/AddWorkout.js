// src/components/AddWorkout.js
import React, { useState } from "react";
import { firestore, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddWorkout = () => {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Get the logged-in user
    if (user) {
      try {
        const docRef = await addDoc(collection(firestore, "workouts"), {
          userId: user.uid,
          type,
          duration,
          calories,
          date: new Date().toISOString(),
        });
        console.log("Workout log added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding workout log: ", error);
      }
    }
  };

  return (
    <div>
      <h2>Add Workout</h2>
      <form onSubmit={handleAddWorkout}>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Workout Type"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          required
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories Burned"
          required
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
