import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import { BriefcaseBusiness, FileText, MapPinIcon, ListChecks } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
      company_id: Number(data.company_id), // Ensure company_id is a number for Supabase
    });
  };

  useEffect(() => {
    if (dataCreateJob && dataCreateJob.length > 0) {
      navigate("/jobs");
    }
  }, [dataCreateJob, navigate]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="pb-16 max-w-4xl mx-auto px-4 sm:px-6 font-['Gilroy']">
      <div className="text-center mb-12 mt-10">
        <h1 className="text-5xl md:text-6xl font-light text-slate-900 leading-none mb-6 tracking-tight">
          Post a <span className="font-bold">New Position.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto font-normal leading-relaxed">
          Fill out the details below to reach the world's top talent with our intelligent matching.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden p-8 sm:p-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          {/* Job Title */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
               Job Title <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g. Senior Product Designer" 
              className="h-14 bg-slate-50 border-slate-100 rounded-2xl text-base px-6 focus:bg-white transition-all shadow-sm"
              {...register("title")} 
            />
            {errors.title && <p className="text-red-500 text-xs font-bold px-1">{errors.title.message}</p>}
          </div>

          {/* Job Description */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
               Job Description <span className="text-red-500">*</span>
            </label>
            <Textarea 
              placeholder="Describe the role, responsibilities, and expected impact..." 
              className="min-h-[160px] bg-slate-50 border-slate-100 rounded-2xl text-base p-6 focus:bg-white transition-all shadow-sm resize-none"
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-bold px-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
                 Location <span className="text-red-500">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 shadow-sm">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => (
                          <SelectItem key={name} value={name} className="rounded-xl">
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-xs font-bold px-1">{errors.location.message}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
                 Company <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <Controller
                  name="company_id"
                  control={control}
                  render={({ field }) => (
                    <div className="flex-1">
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 shadow-sm">
                          <SelectValue placeholder="Company">
                            {field.value
                              ? companies?.find((com) => com.id === Number(field.value))
                                  ?.name
                              : "Select Company"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                          <SelectGroup>
                            {companies?.map(({ name, id }) => (
                              <SelectItem key={name} value={id} className="rounded-xl">
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <AddCompanyDrawer fetchCompanies={fnCompanies} />
              </div>
              {errors.company_id && (
                <p className="text-red-500 text-xs font-bold px-1">{errors.company_id.message}</p>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-800 uppercase tracking-widest px-1">
               Requirements <span className="text-red-500">*</span>
            </label>
            <div className="border border-slate-100 rounded-[1.5rem] overflow-hidden bg-slate-50 shadow-sm" data-color-mode="light">
              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <MDEditor 
                    value={field.value} 
                    onChange={field.onChange} 
                    className="!rounded-[1.5rem] border-0 bg-slate-50"
                    preview="edit"
                    height={300}
                  />
                )}
              />
            </div>
            {errors.requirements && (
              <p className="text-red-500 text-xs font-bold px-1">{errors.requirements.message}</p>
            )}
          </div>

          {errorCreateJob?.message && (
             <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs border border-red-100 font-bold text-center">
               {errorCreateJob?.message}
             </div>
          )}

          {loadingCreateJob && <BarLoader width={"100%"} color="#0f172a" />}
          
          <Button 
            type="submit" 
            size="xl" 
            className="w-full mt-4 h-16 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-lg shadow-xl shadow-slate-100 transition-all hover:-translate-y-1"
            disabled={loadingCreateJob}
          >
            {loadingCreateJob ? "Publishing Position..." : "Publish Position"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
