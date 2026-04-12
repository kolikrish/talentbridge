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
  applied: "bg-slate-50 text-slate-600 border-slate-200",
  interviewing: "bg-amber-50 text-amber-600 border-amber-100",
  hired: "bg-emerald-50 text-emerald-600 border-emerald-100",
  rejected: "bg-rose-50 text-rose-600 border-rose-100",
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
    <Card className="flex flex-col hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 border border-slate-50 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] font-['Gilroy'] overflow-hidden">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#0f172a" className="rounded-t-xl" />}
      
      <CardHeader className="p-8 pb-4">
        <CardTitle className="flex justify-between items-start gap-4">
          <span className="font-bold text-slate-800 text-xl leading-tight">
            {isCandidate
              ? application?.job?.title
              : application?.name}
          </span>
          <button
            onClick={handleDownload}
            className="shrink-0 p-3 rounded-xl bg-slate-50 border border-slate-100/50 text-slate-400 hover:text-slate-900 hover:bg-white transition-all shadow-sm"
            title="Download Resume"
          >
            <Download size={18} />
          </button>
        </CardTitle>
        {isCandidate && (
          <p className="text-sm font-medium text-slate-400 -mt-2">
            at {application?.job?.company?.name}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6 flex-1 p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50">
              <BriefcaseBusiness size={16} className="text-slate-400" />
            </div>
            <span className="font-medium">{application?.experience} years exp.</span>
          </div>
          
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50">
              <School size={16} className="text-slate-400" />
            </div>
            <span className="truncate">{application?.education}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 text-slate-500 text-sm">
          <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50 mt-0.5">
            <Boxes size={16} className="text-slate-400" />
          </div>
          <div className="flex-1">
            <p className="line-clamp-2 leading-relaxed"><span className="font-bold text-slate-700">Skills:</span> {application?.skills}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-8 pt-0 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-300 font-bold uppercase tracking-widest">
          Applied {new Date(application?.created_at).toLocaleDateString()}
        </span>
        
        {isCandidate ? (
          <span className={`capitalize font-bold text-[10px] tracking-[0.1em] px-4 py-2 rounded-full border uppercase ${statusColors[currentStatus] || statusColors.applied}`}>
            {currentStatus}
          </span>
        ) : (
          <div className="w-full sm:w-44">
            <Select
              onValueChange={handleStatusChange}
              defaultValue={currentStatus}
            >
              <SelectTrigger className="w-full h-11 text-xs border-slate-100 rounded-full font-bold bg-slate-50 focus:bg-white shadow-sm px-6">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                <SelectItem value="applied" className="rounded-lg">Applied</SelectItem>
                <SelectItem value="interviewing" className="rounded-lg">Interviewing</SelectItem>
                <SelectItem value="hired" className="rounded-lg">Hired</SelectItem>
                <SelectItem value="rejected" className="rounded-lg">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
