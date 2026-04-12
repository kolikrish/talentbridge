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
    return <BarLoader className="mb-4" width={"100%"} color="#0f172a" />;
  }

  return (
    <div className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-['Gilroy']">
      <div className="text-center mb-16 mt-10">
        <h1 className="text-5xl md:text-6xl font-light text-slate-900 leading-none mb-6 tracking-tight">
          Saved <span className="font-bold">Positions.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto font-normal leading-relaxed">
          Revisit the opportunities that align with your career goals and future ambitions.
        </p>
      </div>

      {loadingSavedJobs === false && (
        <div className="mt-8">
          {savedJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="flex flex-col items-center justify-center py-24 bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.07)] text-center px-6 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center mb-8">
                <BookmarkIcon size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">No Saved Jobs.</h3>
              <p className="text-slate-400 max-w-sm mb-10 font-normal leading-relaxed text-lg text-center">
                You haven't bookmarked any opportunities yet. Start exploring to build your curated list.
              </p>
              <a href="/jobs" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-full shadow-lg shadow-slate-100 text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all duration-300 hover:-translate-y-1">
                Explore Jobs
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
