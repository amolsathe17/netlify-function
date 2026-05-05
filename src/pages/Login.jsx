import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://travel-netlify.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      alert("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">

      {/* 🌄 BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="./maldives.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative z-10 ">

        <div className="bg-black/50 p-8 rounded-xl shadow-lg w-80">
          
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Admin Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border mb-3 rounded bg-white/80"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded  bg-white/80"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full btn btn-primary cursor-pointer"
          >
            Login
          </button>

        </div>

      </div>
    </div>
  );
};

export default Login;