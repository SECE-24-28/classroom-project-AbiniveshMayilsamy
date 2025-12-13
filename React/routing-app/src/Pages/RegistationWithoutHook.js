import React, { useState } from "react";

const RegistrationWithoutHook = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");

  return (
    <div>
      <h1>Registration Without Hook Page</h1>
      <p>This is the Registration Without Hook Page.</p>

      <form>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age</label>
        {/* FIXED: Used (e) and setAge(...) */}
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label>College Name</label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationWithoutHook;
