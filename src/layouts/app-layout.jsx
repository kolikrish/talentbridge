import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-6 min-h-[80vh]">
          <Outlet />
        </main>
      </div>
      <footer className="mt-16 border-t border-[var(--border)] bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2FA084] to-[#3ebd9c] flex items-center justify-center shadow-lg shadow-[#2FA084]/20">
              <span className="text-white font-extrabold text-xs">TB</span>
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Talent<span className="text-[#2FA084]">Bridge</span></span>
          </div>
          <p className="text-sm text-slate-500 font-medium">© 2026 TalentBridge. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-semibold text-slate-400">
            <span className="hover:text-[#2FA084] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#2FA084] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#2FA084] cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
