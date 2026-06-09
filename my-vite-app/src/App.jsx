import React, { useState } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filterSubject, setFilterSubject] = useState("");

  const addAssignment = () => {
    if (!title || !subject || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status,
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
    setStatus("Pending");
  };

  const filteredAssignments =
    filterSubject === ""
      ? assignments
      : assignments.filter(
          (item) =>
            item.subject.toLowerCase() ===
            filterSubject.toLowerCase()
        );

  const submittedCount = assignments.filter(
    (a) => a.status === "Submitted"
  ).length;

  const pendingCount = assignments.filter(
    (a) => a.status === "Pending"
  ).length;

  const lateCount = assignments.filter(
    (a) => a.status === "Late"
  ).length;

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="card">
          <h3>Total</h3>
          <p>{assignments.length}</p>
        </div>

        <div className="card">
          <h3>Submitted</h3>
          <p>{submittedCount}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

        <div className="card">
          <h3>Late</h3>
          <p>{lateCount}</p>
        </div>
      </div>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Submitted</option>
          <option>Late</option>
        </select>

        <button onClick={addAssignment}>
          Add Assignment
        </button>
      </div>

      {/* Filter */}
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by Subject"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.subject}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;