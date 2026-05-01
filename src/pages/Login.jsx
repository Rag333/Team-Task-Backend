import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form); // ✅ FIXED
      login(res.data.data);
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-20">
        <form
          onSubmit={handleLogin}
          className="bg-[#020617] p-8 rounded-xl w-96 border border-gray-800"
        >
          <h2 className="text-xl font-semibold mb-6 text-center">
            Login
          </h2>

          {error && (
            <p className="bg-red-500/10 text-red-400 border border-red-500/20 p-2 rounded text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <input
            placeholder="Email"
            className="w-full p-2 mb-4 bg-gray-900 border border-gray-700 rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-gray-900 border border-gray-700 rounded"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-400 mt-4 text-center">
            No account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;