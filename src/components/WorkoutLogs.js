import { useEffect, useState } from "react";
import { firestore, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const WorkoutLogs = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      if (user) {
        const workoutsRef = collection(firestore, "workouts");
        const q = query(workoutsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const workoutData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWorkouts(workoutData);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Your Workout Logs</h2>
      {workouts.length > 0 ? (
        <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Workout Type</th>
              <th className="py-3 px-4 text-left">Duration (min)</th>
              <th className="py-3 px-4 text-left">Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{new Date(workout.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{workout.type}</td>
                <td className="py-3 px-4">{workout.duration}</td>
                <td className="py-3 px-4">{workout.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No workout logs found.</p>
      )}
    </div>
  );
};

export default WorkoutLogs;
