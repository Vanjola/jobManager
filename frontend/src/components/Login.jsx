import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/jobs/login", {
        username,
        password,
      });
      const token = response.data.access_token;
      sessionStorage.setItem("token", token);
      console.log("Uspesan login!");
      setError("");
      window.location.reload();
    } catch (err) {
      console.error("Greška pri logovanju:", err);
      setError("Neispravni podaci.");
    }
  };
  return (
    <div className="max-w-sm mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
