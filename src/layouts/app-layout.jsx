import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid-background"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-6">
          <Outlet />
        </main>
      </div>
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">JP</span>
            </div>
            <span className="font-bold text-slate-800 text-sm">JobPortal</span>
          </div>
          <p className="text-sm text-slate-500">© 2025 JobPortal. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-500">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
