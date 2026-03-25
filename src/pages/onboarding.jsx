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
    return <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center mb-12">
        <h2 className="font-extrabold text-5xl sm:text-6xl text-slate-900 tracking-tight leading-tight mb-4">
          Choose your <span className="gradient-title">Path</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Tell us what you're looking for so we can personalize your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <button
          onClick={() => handleRoleSelection("candidate")}
          className="group relative flex flex-col items-center justify-center gap-6 p-8 h-64 bg-white border-2 border-slate-200 rounded-3xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300"
        >
          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 shadow-sm">
            <Search size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-2xl text-slate-900 mb-2">I am a Candidate</h3>
            <p className="text-sm text-slate-500 font-medium">Looking for my next great role</p>
          </div>
        </button>

        <button
          onClick={() => handleRoleSelection("recruiter")}
          className="group relative flex flex-col items-center justify-center gap-6 p-8 h-64 bg-white border-2 border-slate-200 rounded-3xl hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300"
        >
          <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300 shadow-sm">
            <Briefcase size={36} className="text-indigo-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-2xl text-slate-900 mb-2">I am a Recruiter</h3>
            <p className="text-sm text-slate-500 font-medium">Looking to hire top talent</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;