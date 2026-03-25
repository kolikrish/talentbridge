import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { BriefcaseBusiness, ListTodo } from "lucide-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="my-8" width={"100%"} color="#3b82f6" />;
  }

  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <div className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 mt-6">
        <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          {isCandidate ? <ListTodo size={32} /> : <BriefcaseBusiness size={32} />}
        </div>
        <h1 className="font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
          {isCandidate ? (
            <>My <span className="gradient-title">Applications</span></>
          ) : (
            <>My <span className="gradient-title">Jobs</span></>
          )}
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          {isCandidate 
            ? "Track your job applications and check their latest status." 
            : "Manage the job listings you have posted."}
        </p>
      </div>

      <div className="mt-8">
        {isCandidate ? <CreatedApplications /> : <CreatedJobs />}
      </div>
    </div>
  );
};

export default MyJobs;
