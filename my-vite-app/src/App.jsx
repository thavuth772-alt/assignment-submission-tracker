import React, { useState } from "react";
import "./App.css";
import CovidTracker from "./CovidTracker";

function App() {
  const [page, setPage] = useState("covid");

  return (
    <div>
      <div className="nav-buttons">
        <button onClick={() => setPage("attendance")}>
          Attendance Dashboard
        </button>

        <button onClick={() => setPage("covid")}>
          COVID Tracker
        </button>
      </div>

      {page === "attendance" ? (
        <AttendanceDashboard />
      ) : (
        <CovidTracker />
      )}
    </div>
  );
}

function AttendanceDashboard() {
  const [batch, setBatch] = useState("Batch A");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState([]);

  const students = {
    "Batch A": ["Arun", "Bala", "Divya", "Kumar"],
    "Batch B": ["Priya", "Rahul", "Sneha", "Vijay"],
    "Batch C": ["John", "Meena", "Surya", "Anu"],
  };

  const markAttendance = (student, status) => {
    if (!date) {
      alert("Please select date");
      return;
    }

    const updatedAttendance = attendance.filter(
      (item) =>
        !(item.student === student && item.batch === batch && item.date === date)
    );

    setAttendance([...updatedAttendance, { student, batch, date, status }]);
  };

  const filteredAttendance = attendance.filter(
    (item) => item.batch === batch && (date === "" || item.date === date)
  );

  const percentage =
    filteredAttendance.length === 0
      ? 0
      : (
          (filteredAttendance.filter((item) => item.status === "Present")
            .length /
            filteredAttendance.length) *
          100
        ).toFixed(2);

  return (
    <div className="container">
      <h1>Trainer Session Attendance Dashboard</h1>

      <div className="filters">
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option>Batch A</option>
          <option>Batch B</option>
          <option>Batch C</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <h2>Mark Attendance - {batch}</h2>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>

        <tbody>
          {students[batch].map((student) => (
            <tr key={student}>
              <td>{student}</td>
              <td>
                <button onClick={() => markAttendance(student, "Present")}>
                  Present
                </button>
              </td>
              <td>
                <button onClick={() => markAttendance(student, "Absent")}>
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Batch-wise Attendance</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Batch</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendance.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.batch}</td>
              <td>{item.student}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Attendance Percentage: {percentage}%</h2>
    </div>
  );
}

export default App;