import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon, Building2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />;
  }

  const isRecruiter = job?.recruiter_id === user?.id;
  const numApplicants = job?.applications?.length || 0;

  return (
    <div className="flex flex-col gap-8 mt-6 pb-16 max-w-5xl mx-auto w-full">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="font-extrabold pb-2 text-3xl sm:text-5xl text-slate-900 leading-tight">
              {job?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-blue-500" size={18} />
                <span>{job?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="text-blue-500" size={18} />
                <span>{numApplicants} Applicant{numApplicants !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                {job?.isOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs">
                    <DoorOpen size={14} /> Open
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs">
                    <DoorClosed size={14} /> Closed
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="shrink-0 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
            {job?.company?.logo_url ? (
              <img src={job?.company?.logo_url} className="h-16 w-auto object-contain" alt={job?.company?.name} />
            ) : (
              <Building2 size={48} className="text-slate-300" />
            )}
          </div>
        </div>

        {isRecruiter && (
          <div className="mt-8 pt-6 border-t border-slate-100 max-w-xs">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Hiring Status</h3>
            <Select onValueChange={handleStatusChange} value={job?.isOpen ? "open" : "closed"}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open - Accepting Applications</SelectItem>
                <SelectItem value="closed">Closed - Stopped Hiring</SelectItem>
              </SelectContent>
            </Select>
            {loadingHiringStatus && <div className="mt-2"><BarLoader width={"100%"} color="#3b82f6" /></div>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* About Section */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">About the job</h2>
            <p className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap">
              {job?.description}
            </p>
          </section>

          {/* Requirements Section */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
              What we are looking for
            </h2>
            <div className="prose prose-slate max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-blue-500 w-full" data-color-mode="light">
              <MDEditor.Markdown
                source={job?.requirements}
                className="bg-transparent text-slate-600 !text-base !font-sans"
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Interested in this role?</h3>
            {!isRecruiter ? (
              <ApplyJobDrawer
                job={job}
                user={user}
                fetchJob={fnJob}
                applied={job?.applications?.find((ap) => ap.candidate_id === user?.id) !== undefined}
              />
            ) : (
              <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">
                You are the recruiter for this job. You can manage candidates below.
              </div>
            )}
            {!isRecruiter && (
               <p className="text-xs text-slate-400 text-center mt-4">
                 Join {numApplicants} other candidates who have applied for this role.
               </p>
            )}
          </div>
        </div>
      </div>

      {/* Applications Section for Recruiters */}
      {isRecruiter && job?.applications?.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-bold text-2xl text-slate-900">
              Applications
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
              {job.applications.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {job?.applications.map((application) => (
              <ApplicationCard key={application.id} application={application} isRecruiter={true} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default JobPage;
