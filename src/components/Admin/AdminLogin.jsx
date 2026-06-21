import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (
      email === "admin@safarsaathi.com" &&
      password === "admin1234"
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
        Safar Saathi
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Admin Portal
      </p>

      <input
        type="email"
        placeholder="Admin Email"
        className="w-full border p-3 rounded-lg mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleAdminLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        Login
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        Authorized Personnel Only
      </p>
    </div>
  </div>
);
}
export default AdminLogin;