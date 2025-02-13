import { useState } from "react";
import { register, login, getMe } from "../api/authService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleRegister = async () => {
    try {
      const data = await register(username, email, password);
      setMessage(`Registered successfully! Welcome ${data.user.username}`);
    } catch (error) {
      setMessage("Registration failed!");
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      setToken(data.jwt);
      localStorage.setItem("token", data.jwt);
      setMessage(`Logged in as ${data.user.username}`);
    } catch (error) {
      setMessage("Login failed!");
    }
  };

  const handleGetUser = async () => {
    try {
      const user = await getMe(localStorage.getItem("token"));
      setMessage(`Logged in as: ${user.username}`);
    } catch (error) {
      setMessage("Failed to fetch user details!");
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetUser}>Get User</button>
      <p>{message}</p>
    </div>
  );
};

export default Auth;
