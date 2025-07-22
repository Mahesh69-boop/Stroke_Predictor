import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    console.log(baseURL);


    try {
     
      console.log("Login API hit");
      const res = await fetch(`${baseURL}/api/User/login`, {
        method: "POST",
        credentials: "include", // to allow HttpOnly cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        login(data.accessToken,{email});
        navigate("/history");
      } else {
       // check the message from the server
       if(data.msg == "User not found"){
        const proceed = window.confirm("User not found. Do you want to register first ?");
        if(proceed){
          navigate("/signup");
        }
       }else{
        alert(data.msg || "Login failed");
       }
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div id="loginbox">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
