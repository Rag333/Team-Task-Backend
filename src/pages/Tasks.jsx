import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignableUsers, setAssignableUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    projectId: "",
    assignedTo: ""
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
      const res = await API.get(`/projects/${projectId}/members`); // ✅ FIX
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
    if (!form.title || !form.projectId || !form.assignedTo) {
      return;
    }

    await API.post("/tasks", form); 

    setForm({
      title: "",
      projectId: "",
      assignedTo: ""
    });

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
      <h1 className="text-2xl font-semibold mb-6">
        {user.role === "admin" ? "Manage Tasks" : "My Tasks"}
      </h1>

      {/* ADMIN CREATE */}
      {user.role === "admin" && (
        <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl mb-6">
          <div className="flex flex-col gap-3">

            <input
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="p-2 bg-gray-900 border border-gray-700 rounded"
            />

            <select
              value={form.projectId}
              onChange={(e) => {
                const pid = e.target.value;
                setForm({
                  ...form,
                  projectId: pid,
                  assignedTo: ""
                });

                if (pid) fetchAssignableUsers(pid);
              }}
              className="p-2 bg-gray-900 border border-gray-700 rounded"
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
              onChange={(e) =>
                setForm({ ...form, assignedTo: e.target.value })
              }
              className="p-2 bg-gray-900 border border-gray-700 rounded"
            >
              <option value="">Assign User</option>

              {assignableUsers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>

            <button
              onClick={createTask}
              className="bg-blue-500 py-2 rounded hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </div>
      )}

      {/* TASK LIST */}
      <div className="grid gap-5">

        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm">
            No tasks available
          </p>
        )}

        {tasks.map((t) => {
          const isMemberOwner =
            user.role === "member" &&
            t.assignedTo?._id === user.id;

          return (
            <div
              key={t._id}
              className="bg-[#020617] border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition"
            >
              <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold">
                  {t.title}
                </h2>

                <div className="flex items-center gap-3">

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

              <div className="mt-3 text-sm text-gray-400 space-y-1">
                <p>📁 Project: {t.project?.name}</p>
                <p>👤 Assigned: {t.assignedTo?.name}</p>
              </div>

              {isMemberOwner && (
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => updateStatus(t._id, "todo")}
                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                  >
                    Todo
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(t._id, "in-progress")
                    }
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-sm"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(t._id, "done")}
                    className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-sm"
                  >
                    Done
                  </button>

                </div>
              )}

              {user.role === "admin" && (
                <p className="text-xs text-gray-500 mt-4">
                  View only (Admin cannot update status)
                </p>
              )}
            </div>
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