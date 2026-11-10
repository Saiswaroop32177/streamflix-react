import { useState } from "react";

export default function AuthModal({ mode, setMode, onClose, onDone }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleAuth = (e) => {
    e.preventDefault();
    const em = email.trim();
    const nm = name.trim();

    if (!em || !password) {
      alert("Please fill all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (mode === "signup") {
      if (!nm) {
        alert("Please enter your full name.");
        return;
      }
      if (users[em]) {
        alert("Account already exists. Please Sign In.");
        setMode("login");
        return;
      }
      users[em] = { name: nm, password };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", em);
      localStorage.setItem("userName", nm);
      alert("Account created successfully! Welcome to StreamFlix.");
    } else {
      if (users[em] && users[em].password === password) {
        localStorage.setItem("user", em);
        localStorage.setItem("userName", users[em].name);
      } else {
        localStorage.setItem("user", em);
        localStorage.setItem("userName", em.split("@")[0]);
      }
      alert("Signed in successfully!");
    }

    onDone();
  };

  return (
    <div className="popup" style={{ display: "flex" }}>
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
        <p className="auth-sub">
          {isLogin ? "Welcome back to StreamFlix" : "Create your StreamFlix account"}
        </p>

        <div className="auth-tabs">
          <button className={`auth-tab ${isLogin ? "active" : ""}`} onClick={() => setMode("login")}>
            Sign In
          </button>
          <button className={`auth-tab ${!isLogin ? "active" : ""}`} onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary full">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? (
            <>New to StreamFlix?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("signup"); }}>Sign up now</a></>
          ) : (
            <>Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); }}>Sign in</a></>
          )}
        </p>
      </div>
    </div>
  );
}