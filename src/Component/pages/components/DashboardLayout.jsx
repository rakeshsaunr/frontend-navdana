import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar: responsive, overlays on mobile, static on desktop */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-4 flex-grow w-full max-w-full">{children}</main>
      </div>
    </div>
  );
}
