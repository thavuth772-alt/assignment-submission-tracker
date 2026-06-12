import React, { useState } from "react";
import "./App.css";

function App() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    name: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyLeave = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      ...form,
      status: "Pending"
    };

    setLeaves([...leaves, newLeave]);

    setForm({
      name: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: ""
    });
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  return (
    <div className="container">
      <h1>HR Employee Leave Management Tool</h1>

      <form onSubmit={applyLeave} className="leave-form">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select
          name="leaveType"
          value={form.leaveType}
          onChange={handleChange}
          required
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Earned Leave">Earned Leave</option>
        </select>

        <input
          type="date"
          name="fromDate"
          value={form.fromDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="toDate"
          value={form.toDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for Leave"
          value={form.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Apply Leave</button>
      </form>

      <h2>Leave Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>HR Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => updateStatus(leave.id, "Approved")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(leave.id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;