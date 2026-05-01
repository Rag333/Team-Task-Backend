import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "../components/EditModal";

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

    await API.post("/projects/add-member", {
      projectId,
      userId
    });

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

    await API.put(`/projects/${editId}`, {
      name: editValue
    });

    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Projects</h1>

      {user?.role === "admin" && (
        <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl mb-6">
          <h2 className="text-sm text-gray-400 mb-3">
            Create New Project
          </h2>

          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded text-sm"
            />

            <button
              onClick={createProject}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-[#020617] border border-gray-800 p-4 rounded-xl relative"
          >
            <h2 className="font-semibold text-lg">{p.name}</h2>

            {user?.role === "admin" && (
              <div className="absolute top-3 right-3 flex gap-3">
                <button
                  onClick={() => openEditModal(p._id, p.name)}
                  className="text-blue-400 text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(p._id)}
                  className="text-red-400 text-xs"
                >
                  Delete
                </button>
              </div>
            )}

            <div className="mt-3 text-sm text-gray-400">
              Members:
              <ul className="mt-1 text-xs">
                {p.members?.map((m) => (
                  <li key={m._id}>
                    • {m.name}
                  </li>
                ))}
              </ul>
            </div>

            {user?.role === "admin" && (
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="Enter email"
                  value={emailMap[p._id] || ""}
                  onChange={(e) =>
                    setEmailMap({
                      ...emailMap,
                      [p._id]: e.target.value
                    })
                  }
                  className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded text-sm"
                />

                <button
                  onClick={() => addMember(p._id)}
                  className="bg-green-500 px-3 rounded text-sm"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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