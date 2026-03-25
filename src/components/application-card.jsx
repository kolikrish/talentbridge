/* eslint-disable react/prop-types */
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const statusColors = {
  applied: "bg-blue-50 text-blue-700 border-blue-200",
  interviewing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  hired: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  const currentStatus = application.status || "applied";

  return (
    <Card className="flex flex-col hover:card-shadow-hover transition-all duration-300">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#3b82f6" className="rounded-t-xl" />}
      
      <CardHeader className="pb-3 px-5 pt-5">
        <CardTitle className="flex justify-between items-start gap-4">
          <span className="font-bold text-slate-900 text-lg leading-tight">
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name}
          </span>
          <button
            onClick={handleDownload}
            className="shrink-0 p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
            title="Download Resume"
          >
            <Download size={16} />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1 px-5 py-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
              <BriefcaseBusiness size={14} className="text-blue-600" />
            </div>
            <span className="font-medium">{application?.experience} years of experience</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <div className="w-7 h-7 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
              <School size={14} className="text-indigo-600" />
            </div>
            <span>{application?.education}</span>
          </div>

          <div className="flex items-start gap-2 text-slate-600 text-sm">
            <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
              <Boxes size={14} className="text-purple-600" />
            </div>
            <span className="leading-relaxed"><span className="font-medium">Skills:</span> {application?.skills}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 pb-5 pt-4 border-t border-slate-100 mt-2">
        <span className="text-xs text-slate-400 font-medium">
          Applied on {new Date(application?.created_at).toLocaleDateString()}
        </span>
        
        {isCandidate ? (
          <span className={`capitalize font-bold text-xs px-3 py-1.5 rounded-full border ${statusColors[currentStatus] || statusColors.applied}`}>
            Status: {currentStatus}
          </span>
        ) : (
          <div className="w-full sm:w-40">
            <Select
              onValueChange={handleStatusChange}
              defaultValue={currentStatus}
            >
              <SelectTrigger className="w-full h-8 text-xs border-slate-200 font-medium bg-slate-50 focus:bg-white focus:border-blue-500">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
