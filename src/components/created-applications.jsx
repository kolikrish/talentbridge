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
    return <BarLoader className="my-8" width={"100%"} color="#3b82f6" />;
  }

  return (
    <div className="w-full flex justify-center">
      {applications?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded-3xl shadow-sm text-center max-w-2xl w-full mx-auto my-8">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner mx-auto">
            <Search size={36} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">No Applications Yet</h3>
          <p className="text-slate-500 max-w-sm mb-8 text-base leading-relaxed">
            You haven't applied to any jobs yet. Start exploring opportunities to find your dream role.
          </p>
          <Link 
            to="/jobs" 
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto my-8">
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
