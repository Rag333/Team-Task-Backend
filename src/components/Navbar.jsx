import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-[#020617]/80 border-b border-white/10">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          onClick={() => navigate(user ? "/dashboard" : "/")}
        >
          TeamTask
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              {/* Nav Links */}
              <div className="flex gap-6 text-sm text-gray-300">
                {["Dashboard", "Projects", "Tasks"].map((item) => (
                  <button
                    key={item}
                    onClick={() => navigate(`/${item.toLowerCase()}`)}
                    className="relative hover:text-white transition"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              {/* User Card */}
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-sm font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-3 py-1.5 rounded-lg text-sm
                           bg-red-500/10 text-red-400 border border-red-500/30
                           hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <div className="flex gap-4 items-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 
                           px-4 py-1.5 rounded-lg text-sm font-medium
                           hover:opacity-90 transition"
              >
                Signup
              </button>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4 space-y-4 text-sm"
          >
            {user && (
              <>
                {["Dashboard", "Projects", "Tasks"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      navigate(`/${item.toLowerCase()}`);
                      setOpen(false);
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white"
                  >
                    {item}
                  </button>
                ))}

                {/* User Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-xs">
                    <p className="text-white">{user.name}</p>
                    <p className="text-gray-400 capitalize">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-red-400"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
