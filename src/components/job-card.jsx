/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob({ user_id: user.id, job_id: job.id });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group border border-slate-50 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)] font-['Gilroy'] overflow-hidden">
      {loadingDeleteJob && (
        <BarLoader className="rounded-t-xl" width={"100%"} color="#0f172a" />
      )}

      <CardHeader className="p-8 pb-4">
        <CardTitle className="flex justify-between items-start gap-3">
          <span className="text-xl font-bold text-slate-800 leading-snug group-hover:text-slate-600 transition-colors">
            {job.title}
          </span>
          {isMyJob && (
            <button
              onClick={handleDeleteJob}
              className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
              title="Delete job"
            >
              <Trash2Icon size={18} />
            </button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 flex-1 px-8 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {job.company?.logo_url ? (
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center p-1.5 border border-slate-100/50">
                <img
                  src={job.company.logo_url}
                  className="w-full h-full object-contain"
                  alt={job.company.name}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100/50">
                <Building2 size={18} className="text-slate-300" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 leading-none mb-1">{job.company?.name || "Company"}</span>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <MapPinIcon size={12} />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-400 text-sm font-normal leading-relaxed line-clamp-2">
          {job.description?.substring(0, job.description.indexOf(".") + 1) || job.description?.substring(0, 120) + "..."}
        </p>
      </CardContent>

      <CardFooter className="p-8 pt-0 flex gap-3">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="default" className="w-full h-12 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold transition-all shadow-md shadow-slate-100">
            View Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className={`w-12 h-12 rounded-xl p-0 shrink-0 border-slate-100 transition-all ${saved ? "bg-red-50 border-red-100" : "bg-slate-50 hover:bg-white"}`}
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
            title={saved ? "Unsave job" : "Save job"}
          >
            <Heart
              size={20}
              className={saved ? "fill-red-500 stroke-red-500" : "stroke-slate-400"}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
