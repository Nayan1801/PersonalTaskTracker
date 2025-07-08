import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".register-card", { opacity: 1, y: 50, duration: 1 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already taken
    const exists = users.find((u) => u.email === form.email.trim().toLowerCase());
    if (exists) {
      setError("❌ User already exists. Please login.");
      return;
    }

    const newUser = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    // Save user to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registered successfully! Please login.");
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-800">
      <div className="register-card bg-white p-8 rounded-xl shadow-2xl w-96 animate-float">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-purple-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
