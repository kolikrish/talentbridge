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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center mb-12">
        <h2 className="font-extrabold text-5xl sm:text-6xl text-slate-900 tracking-tight leading-tight mb-4">
          Choose your <span className="gradient-title">Path</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto font-medium">
          Whether you're building your career or your team, we've got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <button
          onClick={() => handleRoleSelection("candidate")}
          className="group relative flex flex-col items-center justify-center gap-6 p-8 h-72 bg-white/80 backdrop-blur-sm border-2 border-slate-100 rounded-[2rem] hover:border-[#2FA084] hover:bg-[#2FA084]/5 hover:shadow-2xl hover:shadow-[#2FA084]/10 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="w-24 h-24 rounded-3xl bg-[#2FA084]/10 flex items-center justify-center group-hover:bg-[#2FA084] transition-all duration-500 shadow-sm">
            <Search size={40} className="text-[#2FA084] group-hover:text-white transition-colors duration-500" />
          </div>
          <div className="text-center">
            <h3 className="font-black text-2xl text-slate-900 mb-2">I am a Candidate</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Find Your Next Big Break</p>
          </div>
        </button>

        <button
          onClick={() => handleRoleSelection("recruiter")}
          className="group relative flex flex-col items-center justify-center gap-6 p-8 h-72 bg-slate-900 border-2 border-slate-900 rounded-[2rem] hover:bg-slate-800 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-500 shadow-sm border border-white/10">
            <Briefcase size={40} className="text-white group-hover:text-slate-900 transition-colors duration-500" />
          </div>
          <div className="text-center text-white">
            <h3 className="font-black text-2xl mb-2">I am a Recruiter</h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Build Your Dream Team</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;