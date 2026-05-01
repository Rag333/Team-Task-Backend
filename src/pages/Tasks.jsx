import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import { motion } from "framer-motion";

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignableUsers, setAssignableUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    projectId: "",
    assignedTo: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // ================= FETCH =================
  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data?.data?.tasks || []);
  };

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data?.data || []);
  };

  const fetchAssignableUsers = async (projectId) => {
    try {
      const res = await API.get(`/projects/${projectId}/members`);
      setAssignableUsers(res.data?.data || []);
    } catch {
      setAssignableUsers([]);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  // ================= CREATE =================
  const createTask = async () => {
    if (!form.title || !form.projectId || !form.assignedTo) return;

    await API.post("/tasks", form);

    setForm({ title: "", projectId: "", assignedTo: "" });
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  // ================= DELETE =================
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await API.delete(`/tasks/${selectedId}`);
    fetchTasks();
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          {user.role === "admin" ? "Manage Tasks" : "My Tasks"}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track and manage all tasks efficiently.
        </p>
      </div>

      {/* CREATE TASK */}
      {user.role === "admin" && (
        <div className="mb-6 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              placeholder="Task title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={form.projectId}
              onChange={(e) => {
                const pid = e.target.value;
                setForm({ ...form, projectId: pid, assignedTo: "" });
                if (pid) fetchAssignableUsers(pid);
              }}
              className="px-3 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              className="px-3 py-2.5 rounded-lg bg-gray-900/80 border border-gray-700 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Assign User</option>
              {assignableUsers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={createTask}
            className="mt-4 px-5 py-2 rounded-lg text-sm font-medium
                       bg-gradient-to-r from-blue-500 to-purple-500
                       hover:opacity-90 transition"
          >
            Create Task
          </button>
        </div>
      )}

      {/* TASK LIST */}
      <div className="grid gap-5">
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-10">
            No tasks available 🚀
          </div>
        )}

        {tasks.map((t) => {
          const isMemberOwner =
            user.role === "member" && t.assignedTo?._id === user.id;

          return (
            <motion.div
              key={t._id}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-lg"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t.title}</h2>

                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      t.status === "done"
                        ? "bg-green-500/20 text-green-400"
                        : t.status === "in-progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {t.status}
                  </span>

                  {/* Delete */}
                  {user.role === "admin" && (
                    <button
                      onClick={() => openDeleteModal(t._id)}
                      className="text-red-400 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="mt-3 text-sm text-gray-400 space-y-1">
                <p>📁 {t.project?.name}</p>
                <p>👤 {t.assignedTo?.name}</p>
              </div>

              {/* ACTION BUTTONS */}
              {isMemberOwner && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateStatus(t._id, "todo")}
                    className="px-3 py-1 rounded-lg text-xs bg-gray-700 hover:bg-gray-600"
                  >
                    Todo
                  </button>

                  <button
                    onClick={() => updateStatus(t._id, "in-progress")}
                    className="px-3 py-1 rounded-lg text-xs bg-yellow-500/80 hover:bg-yellow-600"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(t._id, "done")}
                    className="px-3 py-1 rounded-lg text-xs bg-green-500 hover:bg-green-600"
                  >
                    Done
                  </button>
                </div>
              )}

              {user.role === "admin" && (
                <p className="text-xs text-gray-500 mt-4">Admin view only</p>
              )}
            </motion.div>
          );
        })}
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
};

export default Tasks;
