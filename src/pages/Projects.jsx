import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "../components/EditModal";
import { motion } from "framer-motion";

const Projects = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [emailMap, setEmailMap] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data?.data || []);
  };

  const createProject = async () => {
    if (!name.trim()) return;
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  const addMember = async (projectId) => {
    const email = emailMap[projectId];
    if (!email) return;

    const resUser = await API.post("/auth/find-user", { email });
    const userId = resUser.data?.data?._id;

    await API.post("/projects/add-member", { projectId, userId });

    setEmailMap({ ...emailMap, [projectId]: "" });
    fetchProjects();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await API.delete(`/projects/${selectedId}`);
    fetchProjects();
  };

  const openEditModal = (id, currentName) => {
    setEditId(id);
    setEditValue(currentName);
    setEditOpen(true);
  };

  const saveEdit = async () => {
    if (!editValue.trim()) return;
    await API.put(`/projects/${editId}`, { name: editValue });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>
      </div>

      {/* CREATE PROJECT */}
      {user?.role === "admin" && (
        <div className="mb-6 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          <h2 className="text-sm text-gray-400 mb-3">Create New Project</h2>

          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              className="flex-1 px-3 py-2.5 rounded-lg
                         bg-gray-900/80 border border-gray-700
                         text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={createProject}
              className="px-4 py-2 rounded-lg text-sm font-medium
                         bg-gradient-to-r from-blue-500 to-purple-500
                         hover:opacity-90 transition"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ y: -5 }}
            className="relative p-5 rounded-2xl 
                       bg-white/5 backdrop-blur 
                       border border-white/10 shadow-lg"
          >
            {/* Title */}
            <h2 className="font-semibold text-lg mb-2">{p.name}</h2>

            {/* Actions */}
            {user?.role === "admin" && (
              <div className="absolute top-4 right-4 flex gap-3 text-xs">
                <button
                  onClick={() => openEditModal(p._id, p.name)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(p._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            )}

            {/* Members */}
            <div className="text-sm text-gray-400 mt-2">
              Members
              <div className="flex flex-wrap gap-2 mt-2">
                {p.members?.map((m) => (
                  <span
                    key={m._id}
                    className="px-2 py-1 text-xs rounded-full
                               bg-white/10 border border-white/10"
                  >
                    {m.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Add Member */}
            {user?.role === "admin" && (
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="Enter email..."
                  value={emailMap[p._id] || ""}
                  onChange={(e) =>
                    setEmailMap({
                      ...emailMap,
                      [p._id]: e.target.value,
                    })
                  }
                  className="flex-1 px-2 py-2 rounded-lg
                             bg-gray-900/80 border border-gray-700
                             text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button
                  onClick={() => addMember(p._id)}
                  className="px-3 rounded-lg text-xs font-medium
                             bg-green-500/20 text-green-400 border border-green-500/30
                             hover:bg-green-500/30 transition"
                >
                  Add
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* MODALS */}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <EditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={saveEdit}
        value={editValue}
        setValue={setEditValue}
      />
    </Layout>
  );
};

export default Projects;
