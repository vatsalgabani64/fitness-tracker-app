import { useState, useEffect } from "react";
import { firestore, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ViewReminders = () => {
  const [reminders, setReminders] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      const user = auth.currentUser;
      if (user) {
        const reminderRef = doc(firestore, "reminders", user.uid);
        const reminderDoc = await getDoc(reminderRef);
        if (reminderDoc.exists()) {
          setReminders(reminderDoc.data());
        }
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Your Workout Reminders</h2>
      {reminders ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Days</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-blue-100">
              <td className="border px-4 py-2">{reminders.time}</td>
              <td className="border px-4 py-2">{reminders.days.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center">No reminders set.</p>
      )}
    </div>
  );
};

export default ViewReminders;
