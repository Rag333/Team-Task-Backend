import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", form);
      login(res.data.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full top-[-80px] left-[-80px]" />
        <div className="absolute w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full bottom-[-80px] right-[-80px]" />

        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md 
                     bg-white/5 backdrop-blur-xl 
                     border border-white/10 
                     shadow-2xl rounded-2xl 
                     p-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Account 🚀
          </h2>

          {/* Error */}
          {error && (
            <p
              className="bg-red-500/10 text-red-400 border border-red-500/20 
                          p-2 rounded-md text-sm mb-4 text-center"
            >
              {error}
            </p>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2.5 rounded-lg
                         bg-gray-900/80 border border-gray-700
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2.5 rounded-lg
                         bg-gray-900/80 border border-gray-700
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-3 py-2.5 rounded-lg
                         bg-gray-900/80 border border-gray-700
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Role Select */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-1 block">Role</label>
            <select
              className="w-full px-3 py-2.5 rounded-lg
                         bg-gray-900/80 border border-gray-700
                         text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-medium
              ${
                loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-blue-500/20"
              }
              transition`}
          >
            {loading ? "Creating..." : "Signup"}
          </button>

          {/* Footer */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </motion.form>
      </div>
    </Layout>
  );
};

export default Signup;
