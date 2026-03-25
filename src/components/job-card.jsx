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
    <Card className="flex flex-col hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200 group">
      {loadingDeleteJob && (
        <BarLoader className="rounded-t-xl" width={"100%"} color="#3b82f6" />
      )}

      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start gap-2">
          <span className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
            {job.title}
          </span>
          {isMyJob && (
            <button
              onClick={handleDeleteJob}
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
              title="Delete job"
            >
              <Trash2Icon size={16} />
            </button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {job.company?.logo_url ? (
              <img
                src={job.company.logo_url}
                className="h-7 w-auto object-contain"
                alt={job.company.name}
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center">
                <Building2 size={14} className="text-slate-400" />
              </div>
            )}
            {job.company?.name && (
              <span className="text-sm font-medium text-slate-600">{job.company.name}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPinIcon size={13} />
            <span>{job.location}</span>
          </div>
        </div>

        <hr className="border-slate-100" />

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
          {job.description?.substring(0, job.description.indexOf(".") + 1) || job.description?.substring(0, 120) + "..."}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="default" className="w-full text-sm">
            View Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className={`w-10 h-10 p-0 shrink-0 ${saved ? "border-red-200 bg-red-50 hover:bg-red-100" : ""}`}
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
            title={saved ? "Unsave job" : "Save job"}
          >
            <Heart
              size={17}
              className={saved ? "fill-red-500 stroke-red-500" : "stroke-slate-400"}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
