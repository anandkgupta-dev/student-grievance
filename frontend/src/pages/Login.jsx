import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        data
      );

      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button className="primary" type="submit">
            Login
          </button>
        </form>

        <p
          style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;