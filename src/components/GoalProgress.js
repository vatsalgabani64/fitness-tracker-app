import { useState, useEffect } from "react";
import { firestore, auth } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const GoalProgress = () => {
  const [goal, setGoal] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    const fetchGoal = async () => {
      const user = auth.currentUser;
      if (user) {
        const goalRef = doc(firestore, "goals", user.uid);
        const goalDoc = await getDoc(goalRef);
        if (goalDoc.exists()) {
          setGoal(goalDoc.data());
        }
      }
    };

    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsRef = collection(firestore, "workouts");
        const q = query(workoutsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const workoutData = querySnapshot.docs.map(doc => doc.data());
        setWorkouts(workoutData);
      }
    };

    fetchGoal();
    fetchWorkouts();
  }, []);

  const getCaloriesData = () => {
    const caloriesBurned = new Array(7).fill(0);
    const progressiveCalories = new Array(7).fill(0); // Array to hold progressive totals
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      const dayIndex = workoutDate.getDay(); // 0 for Sunday, 6 for Saturday
      const calories = Number(workout.calories); // Convert to number
      if (!isNaN(calories)) { // Check if calories is a valid number
        caloriesBurned[dayIndex] += calories;
      }
    });

    // Calculate progressive total calories burned
    for (let i = 0; i < caloriesBurned.length; i++) {
      if (i === 0) {
        progressiveCalories[i] = caloriesBurned[i]; // First day
      } else {
        progressiveCalories[i] = progressiveCalories[i - 1] + caloriesBurned[i]; // Cumulative total
      }
    }

    return {
      labels,
      datasets: [
        {
          label: 'Calories Burned',
          data: progressiveCalories, // Use the progressive total
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
        },
        {
          label: 'Goal Calories',
          data: new Array(7).fill(goal ? goal.caloriesToBurn : 0), // Set goal calories directly
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
        }
      ]
    };
  };

  return (
    <div>
      <h2>Goal Progress</h2>
      {goal && (
        <>
          <Line data={getCaloriesData()} />
        </>
      )}
    </div>
  );
};

export default GoalProgress;
