import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Glass Card Container */}
        <div
          className="bg-white/5 backdrop-blur-lg
                     border border-white/10
                     rounded-2xl shadow-xl
                     p-5 sm:p-6"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
