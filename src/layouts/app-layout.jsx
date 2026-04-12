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
      <footer className="mt-10 border-t border-slate-100 bg-white pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-['Gilroy']">TalentBridge.</h3>
              <p className="text-slate-400 text-sm font-['Gilroy'] leading-relaxed max-w-xs">
                A thoughtful space for global talent and world-class companies to connect 
                through intelligent matching.
              </p>
            </div>

            {/* Candidates Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 font-['Gilroy']">For Candidates</h4>
              <ul className="space-y-4">
                {['Find Jobs', 'Saved Roles', 'Job Alerts', 'Career Path'].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 text-sm font-['Gilroy'] hover:text-slate-900 cursor-pointer transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recruiters Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 font-['Gilroy']">For Recruiters</h4>
              <ul className="space-y-4">
                {['Post a Job', 'Talent Search', 'Hiring Analytics', 'Pricing'].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 text-sm font-['Gilroy'] hover:text-slate-900 cursor-pointer transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 mb-6 font-['Gilroy']">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 text-sm font-['Gilroy'] hover:text-slate-900 cursor-pointer transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-['Gilroy'] font-medium">
              © 2026 TalentBridge Inc. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <span key={social} className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-900 cursor-pointer transition-colors">
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
