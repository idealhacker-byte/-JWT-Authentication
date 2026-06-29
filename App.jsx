import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [view, setView] = useState("login"); // login | register | protected
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [protectedData, setProtectedData] = useState(null);

  const token = localStorage.getItem("jwt_token");

  const handleRegister = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setUsername("");
        setPassword("");
        setView("login");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  const handleLogin = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("jwt_token", data.token);
        setMessage("Login successful! Token saved.");
        setUsername("");
        setPassword("");
        setView("protected");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  const handleProtected = async () => {
    setMessage("");
    const storedToken = localStorage.getItem("jwt_token");
    if (!storedToken) {
      setMessage("No token found. Please log in first.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProtectedData(data);
      } else {
        setMessage(data.message);
        setProtectedData(null);
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    setProtectedData(null);
    setMessage("Logged out successfully.");
    setView("login");
  };

  return (
    <div className="container">
      <h1>JWT Authentication</h1>

      <nav className="nav">
        <button
          className={view === "register" ? "active" : ""}
          onClick={() => { setView("register"); setMessage(""); }}
        >
          Register
        </button>
        <button
          className={view === "login" ? "active" : ""}
          onClick={() => { setView("login"); setMessage(""); }}
        >
          Login
        </button>
        <button
          className={view === "protected" ? "active" : ""}
          onClick={() => { setView("protected"); setMessage(""); }}
        >
          Protected Route
        </button>
        {token && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      {message && <p className="message">{message}</p>}

      {view === "register" && (
        <div className="form-card">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary-btn" onClick={handleRegister}>
            Register
          </button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => setView("login")}>
              Login
            </span>
          </p>
        </div>
      )}

      {view === "login" && (
        <div className="form-card">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={() => setView("register")}>
              Register
            </span>
          </p>
        </div>
      )}

      {view === "protected" && (
        <div className="form-card">
          <h2>Protected Route</h2>
          {token ? (
            <>
              <p className="token-info">
                ✅ Token found in localStorage
              </p>
              <button className="primary-btn" onClick={handleProtected}>
                Access Protected Route
              </button>
              {protectedData && (
                <div className="protected-data">
                  <p>{protectedData.message}</p>
                  <pre>{JSON.stringify(protectedData.user, null, 2)}</pre>
                </div>
              )}
            </>
          ) : (
            <>
              <p>❌ No token found. Please log in first.</p>
              <button className="primary-btn" onClick={() => setView("login")}>
                Go to Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
