import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Layout;