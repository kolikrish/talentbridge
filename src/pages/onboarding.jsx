import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, Search } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#2FA084" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-['Gilroy']">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-light text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Choose your <span className="font-bold">Path.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-lg mx-auto font-normal leading-relaxed">
          Whether you're building your career or your team, we've got you covered with intelligent matching.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => handleRoleSelection("candidate")}
          className="group relative flex flex-col items-center justify-center gap-8 p-12 h-80 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 hover:-translate-y-2 focus:outline-none"
        >
          <div className="w-20 h-20 rounded-[20px] bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-500 shadow-sm">
            <Search size={32} className="text-slate-900 group-hover:text-white transition-colors duration-500" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-2xl text-slate-800 mb-2">Candidate</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Find Your Next Big Break</p>
          </div>
        </button>

        <button
          onClick={() => handleRoleSelection("recruiter")}
          className="group relative flex flex-col items-center justify-center gap-8 p-12 h-80 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 hover:-translate-y-2 focus:outline-none"
        >
          <div className="w-20 h-20 rounded-[20px] bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-all duration-500 shadow-sm">
            <Briefcase size={32} className="text-slate-900 group-hover:text-white transition-colors duration-500" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-2xl text-slate-800 mb-2">Recruiter</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Build Your Dream Team</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;