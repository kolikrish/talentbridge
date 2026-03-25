/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword" ||
          file[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      { message: "Only PDF or Word documents are allowed." }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "default" : "destructive"}
          className="w-full text-base font-bold shadow-md shadow-blue-200"
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Application Submitted ✅" : "Apply Now") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-w-md mx-auto h-[90vh] md:h-auto rounded-t-3xl md:rounded-b-none border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <DrawerHeader className="border-b border-slate-100 pb-4">
          <DrawerTitle className="text-2xl text-slate-800">
            Submit your Application
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            Applying for{" "}
            <span className="font-semibold text-slate-900">{job?.title}</span>{" "}
            at{" "}
            <span className="font-semibold text-slate-900">{job?.company?.name}</span>
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 overflow-y-auto"
        >
          <div className="space-y-1.5">
            <Label htmlFor="experience" className="text-slate-700 font-semibold">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g. 2"
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 rounded-lg h-11"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors.experience && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.experience.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="skills" className="text-slate-700 font-semibold">Key Skills (Comma Separated)</Label>
            <Input
              id="skills"
              type="text"
              placeholder="React, Node.js, Design..."
              className="bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 rounded-lg h-11"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.skills.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Highest Education Level</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup 
                  onValueChange={field.onChange} 
                  {...field}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor="intermediate" className="flex items-center space-x-3 border border-slate-200 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <span className="text-sm font-medium text-slate-700">High School / Intermediate</span>
                  </label>
                  <label htmlFor="graduate" className="flex items-center space-x-3 border border-slate-200 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <span className="text-sm font-medium text-slate-700">Graduate Degree / Bachelor's</span>
                  </label>
                  <label htmlFor="post-graduate" className="flex items-center space-x-3 border border-slate-200 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <span className="text-sm font-medium text-slate-700">Post Graduate / Master's</span>
                  </label>
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.education.message}</p>
            )}
          </div>

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="resume" className="text-slate-700 font-semibold">Resume / CV (PDF, DOC)</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-slate-600 justify-center">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf, .doc, .docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...register("resume")}
                    />
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  PDF or DOC up to 5MB
                </p>
              </div>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1 font-medium text-center">{errors.resume.message}</p>
            )}
            <p className="text-xs font-semibold text-slate-700 truncate mt-2 text-center" id="file-name-display"></p>
          </div>

          {errorApply?.message && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center border border-red-200 font-medium">
              {errorApply?.message}
            </div>
          )}
          
          {loadingApply && <BarLoader width={"100%"} color="#3b82f6" />}
          
          <Button type="submit" size="xl" disabled={loadingApply} className="w-full mt-2 font-bold shadow-md shadow-blue-200">
            Submit Application
          </Button>
        </form>

        <DrawerFooter className="border-t border-slate-100 bg-slate-50 py-4">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full sm:w-auto mx-auto border-slate-300 text-slate-600 font-semibold bg-white">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
