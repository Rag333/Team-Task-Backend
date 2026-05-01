import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

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
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Manage Work{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Smarter
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-xl mb-10 text-lg"
        >
          Organize projects, assign tasks, and collaborate with your team — all
          in one modern platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 
                       px-6 py-2.5 rounded-lg font-medium
                       shadow-lg shadow-blue-500/20
                       hover:opacity-90 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-white/20 px-6 py-2.5 rounded-lg
                       hover:bg-white/10 transition"
          >
            Login
          </button>
        </motion.div>

        {/* Feature Pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
          {["Project Tracking", "Team Collaboration", "Task Management"].map(
            (item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
              >
                {item}
              </span>
            ),
          )}
        </div>

        {/* Footer */}
        <p className="mt-16 text-gray-500 text-sm">
          Built by <span className="text-gray-300">Mahipal Singh</span>
        </p>
      </div>
    </Layout>
  );
};

export default Home;
