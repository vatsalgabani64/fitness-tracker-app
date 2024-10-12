import { useState } from "react";
import { firestore, auth } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const SetReminder = () => {
  const [reminder, setReminder] = useState({
    time: "",
    days: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleDayChange = (day) => {
    setReminder((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userReminderRef = doc(firestore, "reminders", user.uid);
      await setDoc(userReminderRef, reminder);
      alert("Reminder set successfully!");
      // Reset the reminder state after submission
      setReminder({ time: "", days: [] });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Set Workout Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg">Reminder Time:</label>
          <input
            type="time"
            name="time"
            value={reminder.time}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Select Days:</label>
          <div className="grid grid-cols-2 gap-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleDayChange(day)}
                  checked={reminder.days.includes(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Set Reminder
        </button>
      </form>
    </div>
  );
};

export default SetReminder;
