import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";
import { BriefcaseBusiness } from "lucide-react";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full font-['Gilroy']">
      {loadingCreatedJobs ? (
        <BarLoader className="mt-8 mb-4" width={"100%"} color="#0f172a" />
      ) : (
        <div className="mt-8">
          {createdJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {createdJobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobAction={fnCreatedJobs}
                    isMyJob
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center px-6">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center mb-8">
               <BriefcaseBusiness size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">No Positions.</h3>
              <p className="text-slate-400 max-w-sm mb-10 font-normal leading-relaxed text-lg">
                Your project pipeline is currently empty. Start building your dream team today.
              </p>
              <a href="/post-job" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-full shadow-lg shadow-slate-100 text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all duration-300 hover:-translate-y-1">
                Post New Position
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
