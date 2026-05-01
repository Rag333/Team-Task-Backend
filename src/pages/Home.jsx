import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Team Task Manager
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Manage projects, assign tasks, and track progress efficiently.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border border-gray-500 px-6 py-2 rounded-lg hover:border-white"
          >
            Signup
          </button>
        </div>

        <p className="mt-16 text-gray-500 text-sm">
          Built by Mahipal Singh
        </p>

      </div>
    </Layout>
  );
};

export default Home;