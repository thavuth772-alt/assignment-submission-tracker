import React, { useState } from "react";
import "./App.css";

function App() {
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    workshop: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerParticipant = (e) => {
    e.preventDefault();

    const duplicate = participants.find(
      (person) => person.email === form.email || person.phone === form.phone
    );

    if (duplicate) {
      setMessage("Already registered! Duplicate entry not allowed.");
      return;
    }

    const newParticipant = {
      id: Date.now(),
      ...form
    };

    setParticipants([...participants, newParticipant]);
    setMessage("Registration successful! Confirmation message sent.");

    setForm({
      name: "",
      email: "",
      phone: "",
      workshop: ""
    });
  };

  return (
    <div className="container">
      <h1>Workshop Registration & Confirmation App</h1>

      <form onSubmit={registerParticipant} className="registration-form">
        <input
          type="text"
          name="name"
          placeholder="Participant Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select
          name="workshop"
          value={form.workshop}
          onChange={handleChange}
          required
        >
          <option value="">Select Workshop</option>
          <option value="React.js Workshop">React.js Workshop</option>
          <option value="Node.js Workshop">Node.js Workshop</option>
          <option value="Blockchain Workshop">Blockchain Workshop</option>
          <option value="AI Workshop">AI Workshop</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {message && <h3 className="message">{message}</h3>}

      <h2>Participant List</h2>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Workshop</th>
          </tr>
        </thead>

        <tbody>
          {participants.map((person, index) => (
            <tr key={person.id}>
              <td>{index + 1}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{person.workshop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;