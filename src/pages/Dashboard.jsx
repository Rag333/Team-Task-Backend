import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 
                 p-5 rounded-2xl shadow-lg transition-all"
    >
      <p className="text-gray-400 text-sm mb-2">{title}</p>

      <h2
        className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
      >
        {value}
      </h2>
    </motion.div>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data?.data || []);
    } catch {}
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data?.data?.tasks || []);
    } catch {}
  };

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const pendingTasks = tasks.filter((t) => t.status !== "done").length;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {user.name}
          </span>{" "}
          👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what’s happening with your workspace today.
        </p>
      </div>

      {/* ================= ADMIN ================= */}
      {user.role === "admin" && (
        <>
          <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wide">
            Admin Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard
              title="Projects"
              value={totalProjects}
              color="from-blue-400 to-blue-600"
            />
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              color="from-purple-400 to-purple-600"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              color="from-green-400 to-green-600"
            />
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
            Manage projects, assign tasks, and monitor overall team progress.
          </div>
        </>
      )}

      {/* ================= MEMBER ================= */}
      {user.role === "member" && (
        <>
          <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wide">
            My Tasks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard
              title="My Tasks"
              value={totalTasks}
              color="from-blue-400 to-blue-600"
            />
            <StatCard
              title="Pending"
              value={pendingTasks}
              color="from-yellow-400 to-orange-500"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              color="from-green-400 to-green-600"
            />
          </div>

          <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300">
            Stay on track by updating your tasks regularly.
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
