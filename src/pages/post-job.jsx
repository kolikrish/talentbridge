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
  }, [dataCreateJob]);

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
    <div className="pb-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10 mt-6">
        <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <BriefcaseBusiness size={32} />
        </div>
        <h1 className="font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-4">
          Post a <span className="gradient-title">New Job</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Fill out the details below to publish a job listing and reach top talent.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
               Job Title <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g. Senior Frontend Engineer" 
              className="h-12 bg-slate-50 text-base"
              {...register("title")} 
            />
            {errors.title && <p className="text-red-500 text-xs font-semibold">{errors.title.message}</p>}
          </div>

          {/* Job Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
               Job Description <span className="text-red-500">*</span>
            </label>
            <Textarea 
              placeholder="Describe the role, responsibilities, and impact..." 
              className="min-h-[140px] bg-slate-50 text-base resize-y"
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-red-500 text-xs font-semibold">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 Location <span className="text-red-500">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-12 bg-slate-50">
                      <SelectValue placeholder="Select a Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-xs font-semibold">{errors.location.message}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                 Company <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <Controller
                  name="company_id"
                  control={control}
                  render={({ field }) => (
                    <div className="flex-1">
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-12 bg-slate-50">
                          <SelectValue placeholder="Select Company">
                            {field.value
                              ? companies?.find((com) => com.id === Number(field.value))
                                  ?.name
                              : "Select Company"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {companies?.map(({ name, id }) => (
                              <SelectItem key={name} value={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                {/* Custom wrapper inside Drawer */}
                <AddCompanyDrawer fetchCompanies={fnCompanies} />
              </div>
              {errors.company_id && (
                <p className="text-red-500 text-xs font-semibold">{errors.company_id.message}</p>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ListChecks size={16} className="text-slate-400" /> Requirements <span className="text-red-500">*</span>
            </label>
            <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all" data-color-mode="light">
              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <MDEditor 
                    value={field.value} 
                    onChange={field.onChange} 
                    className="!rounded-lg border-0 bg-transparent"
                    preview="edit"
                    height={300}
                  />
                )}
              />
            </div>
            {errors.requirements && (
              <p className="text-red-500 text-xs font-semibold">{errors.requirements.message}</p>
            )}
          </div>

          {errorCreateJob?.message && (
             <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 font-semibold flex items-center justify-center">
               {errorCreateJob?.message}
             </div>
          )}

          {loadingCreateJob && <BarLoader width={"100%"} color="#3b82f6" />}
          
          <Button 
            type="submit" 
            size="xl" 
            className="w-full mt-4 font-bold h-14 text-lg shadow-lg shadow-blue-200 hover:-translate-y-0.5 transition-transform"
            disabled={loadingCreateJob}
          >
            {loadingCreateJob ? "Publishing Job..." : "Publish Job"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
