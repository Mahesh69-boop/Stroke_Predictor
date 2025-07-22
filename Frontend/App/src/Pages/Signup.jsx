import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_BASE_URL;
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/api/NewUser/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div id="signupbox">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input id="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
