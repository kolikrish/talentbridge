import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { BookmarkIcon } from "lucide-react";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />;
  }

  return (
    <div className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <BookmarkIcon size={32} />
        </div>
        <h1 className="font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
          Saved <span className="gradient-title">Jobs</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Keep track of the opportunities that catch your eye.
        </p>
      </div>

      {loadingSavedJobs === false && (
        <div className="mt-8">
          {savedJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs?.map((saved) => (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm text-center px-4">
              <div className="text-6xl mb-6 opacity-80 pt-4">👀</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Saved Jobs Yet</h3>
              <p className="text-slate-500 max-w-sm mb-6">
                You haven't saved any jobs yet. Browse the job listings and click the heart icon to save jobs here.
              </p>
              <a href="/jobs" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                Browse Jobs
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
