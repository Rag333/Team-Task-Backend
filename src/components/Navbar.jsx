import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 bg-[#020617]">
      
      <div className="flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer text-blue-400"
          onClick={() => navigate(user ? "/dashboard" : "/")}
        >
          TeamTask
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          {user && (
            <>
              <div className="flex gap-5 text-sm text-gray-300">
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/projects")}>Projects</button>
                <button onClick={() => navigate("/tasks")}>Tasks</button>
              </div>

              <div className="flex items-center gap-3 bg-gray-900 px-3 py-1 rounded-lg border border-gray-800">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-md text-sm hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="text-sm text-gray-300">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="bg-blue-500 px-4 py-1 rounded text-sm">
                Signup
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm">

          {user && (
            <>
              <button onClick={() => navigate("/dashboard")}>Dashboard</button>
              <button onClick={() => navigate("/projects")}>Projects</button>
              <button onClick={() => navigate("/tasks")}>Tasks</button>

              <div className="flex items-center gap-3 mt-2">
                <div className="w-7 h-7 flex items-center justify-center bg-blue-500 rounded-full text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs">
                  <p>{user.name}</p>
                  <p className="text-gray-400">{user.role}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-red-400 text-left"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default Navbar;