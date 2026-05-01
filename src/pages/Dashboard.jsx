import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

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

  // 🔥 STATS
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "done").length;
  const pendingTasks = tasks.filter(t => t.status !== "done").length;

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, {user.name} 👋
      </h1>

      {/* ================= ADMIN DASHBOARD ================= */}
      {user.role === "admin" && (
        <>
          <h2 className="text-sm text-gray-400 mb-4">
            Admin Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">Projects</p>
              <h2 className="text-2xl font-bold">{totalProjects}</h2>
            </div>

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <h2 className="text-2xl font-bold">{totalTasks}</h2>
            </div>

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">Completed Tasks</p>
              <h2 className="text-2xl font-bold">{completedTasks}</h2>
            </div>

          </div>

          {/* QUICK ACTION */}
          <div className="mt-6 text-sm text-gray-400">
            Manage projects, assign tasks, and track progress.
          </div>
        </>
      )}

      {/* ================= MEMBER DASHBOARD ================= */}
      {user.role === "member" && (
        <>
          <h2 className="text-sm text-gray-400 mb-4">
            My Task Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">My Tasks</p>
              <h2 className="text-2xl font-bold">{totalTasks}</h2>
            </div>

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">Pending</p>
              <h2 className="text-2xl font-bold">{pendingTasks}</h2>
            </div>

            <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl">
              <p className="text-gray-400 text-sm">Completed</p>
              <h2 className="text-2xl font-bold">{completedTasks}</h2>
            </div>

          </div>

          {/* MESSAGE */}
          <div className="mt-6 text-sm text-gray-400">
            Track your assigned tasks and update progress.
          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;