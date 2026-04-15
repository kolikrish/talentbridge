/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Building2, Upload } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg" || file[0].type === "image/webp" || file[0].type === "image/svg+xml"),
      {
        message: "Only Images are allowed (PNG, JPEG, WEBP, SVG)",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
      reset();
      // Click the close button to close the drawer
      document.getElementById("close-company-drawer")?.click();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" size="lg" variant="outline" className="h-14 border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-2xl px-6">
          <Building2 size={16} className="mr-2" />
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] focus:outline-none bg-white">
        <DrawerHeader className="border-b border-slate-50 pb-6 pt-8">
          <DrawerTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Building2 size={22} />
            </div>
            Add New Company
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-8 p-8">
          {/* Company Name */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input 
              placeholder="e.g. Acme Corporation" 
              className="h-14 bg-slate-50 border-slate-100 rounded-2xl text-base px-6 focus:bg-white focus:ring-blue-500/20 transition-all shadow-sm"
              {...register("name")} 
            />
            {errors.name && <p className="text-red-500 text-xs font-bold px-1">{errors.name.message}</p>}
          </div>

          {/* Company Logo */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
              Company Logo <span className="text-red-500">*</span>
            </label>
            <div className="group relative mt-1 flex flex-col items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-100 border-dashed rounded-[2rem] bg-slate-50 hover:bg-slate-100 hover:border-blue-200 transition-all cursor-pointer">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 mx-auto shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={24} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700">Click to upload logo</p>
                  <p className="text-xs text-slate-400 font-medium">
                    PNG, JPG, SVG up to 5MB
                  </p>
                </div>
              </div>
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...register("logo")}
              />
            </div>
            {errors.logo && <p className="text-red-500 text-xs font-bold px-1 text-center mt-2">{errors.logo.message}</p>}
          </div>

          {errorAddCompany?.message && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs border border-red-100 font-bold text-center">
              {errorAddCompany?.message}
            </div>
          )}
          
          {loadingAddCompany && <BarLoader width={"100%"} color="#3b82f6" className="rounded-full" />}
          
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            size="xl"
            disabled={loadingAddCompany}
            className="w-full h-16 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-lg shadow-xl shadow-slate-100 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0"
          >
            {loadingAddCompany ? "Creating..." : "Create Company"}
          </Button>
        </div>

        <DrawerFooter className="border-t border-slate-50 bg-slate-50/50 p-6">
          <DrawerClose asChild>
            <Button id="close-company-drawer" type="button" variant="ghost" className="w-full h-12 text-slate-400 font-bold hover:text-slate-600 hover:bg-transparent">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
