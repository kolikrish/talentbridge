import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { BriefcaseBusiness, ListTodo } from "lucide-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="my-8" width={"100%"} color="#0f172a" />;
  }

  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <div className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Gilroy']">
      <div className="text-center mb-16 mt-10">
        <h1 className="text-5xl md:text-6xl font-light text-slate-900 leading-none mb-6 tracking-tight">
          {isCandidate ? (
            <>My <span className="font-bold">Applications.</span></>
          ) : (
            <>My <span className="font-bold">Positions.</span></>
          )}
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto font-normal leading-relaxed">
          {isCandidate 
            ? "Track your current job applications and monitor their real-time progress." 
            : "Manage and optimize the job listings you have published to the platform."}
        </p>
      </div>

      <div className="mt-8">
        {isCandidate ? <CreatedApplications /> : <CreatedJobs />}
      </div>
    </div>
  );
};

export default MyJobs;
