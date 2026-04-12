import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return <BarLoader className="my-8" width={"100%"} color="#0f172a" />;
  }

  return (
    <div className="w-full font-['Gilroy']">
      {applications?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white border border-slate-50 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center max-w-2xl w-full mx-auto my-8">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center mb-8 mx-auto">
            <Search size={32} />
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4">No Applications.</h3>
          <p className="text-slate-400 max-w-sm mb-10 font-normal leading-relaxed text-lg">
            You haven't applied to any opportunities yet. Start your journey by exploring available roles.
          </p>
          <Link
            to="/jobs" 
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-full shadow-lg shadow-slate-100 text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all duration-300 hover:-translate-y-1"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto my-8">
          {applications?.map((application) => {
            return (
              <ApplicationCard
                key={application.id}
                application={application}
                isCandidate={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;
