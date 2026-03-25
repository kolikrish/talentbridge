import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

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
    <div className="w-full">
      {loadingCreatedJobs ? (
        <BarLoader className="mt-8 mb-4" width={"100%"} color="#3b82f6" />
      ) : (
        <div className="mt-8">
          {createdJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm text-center px-4">
              <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Jobs Found</h3>
              <p className="text-slate-500 max-w-sm mb-6 font-medium">
                You haven't posted any jobs yet. Start building your team by posting a new listing.
              </p>
              <a href="/post-job" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 hover:-translate-y-0.5">
                Post your first Job
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
