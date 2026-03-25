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
        <Button type="button" size="lg" variant="outline" className="h-11 border-blue-200 text-blue-600 hover:bg-blue-50">
          <Building2 size={16} className="mr-2" />
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto h-[80vh] md:h-auto rounded-t-3xl md:rounded-b-none border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <DrawerHeader className="border-b border-slate-100 pb-4">
          <DrawerTitle className="text-xl text-slate-800 flex items-center gap-2">
            <Building2 size={20} className="text-blue-600" />
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-5 p-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Company Name</label>
            <Input 
              placeholder="e.g. Acme Corp" 
              className="bg-slate-50 focus:bg-white h-11"
              {...register("name")} 
            />
            {errors.name && <p className="text-red-500 text-xs font-medium mt-1">{errors.name.message}</p>}
          </div>

          {/* Company Logo */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Company Logo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 mx-auto shadow-sm">
                  <Upload size={20} className="text-slate-400" />
                </div>
                <div className="flex text-sm text-slate-600 justify-center font-medium">
                  <span className="relative cursor-pointer bg-transparent rounded-md text-blue-600 hover:text-blue-500">
                    <span>Click to upload logo</span>
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...register("logo")}
                    />
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  PNG, JPG, SVG up to 5MB
                </p>
              </div>
            </div>
            {errors.logo && <p className="text-red-500 text-xs font-medium mt-1 text-center">{errors.logo.message}</p>}
          </div>

          {errorAddCompany?.message && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center border border-red-200 font-medium">
              {errorAddCompany?.message}
            </div>
          )}
          
          {loadingAddCompany && <BarLoader width={"100%"} color="#3b82f6" />}
          
          <Button
            type="submit"
            size="xl"
            disabled={loadingAddCompany}
            className="w-full mt-2 font-bold shadow-md shadow-blue-200 cursor-pointer"
          >
            Add Company
          </Button>
        </form>
        <DrawerFooter className="border-t border-slate-100 bg-slate-50 py-4">
          <DrawerClose asChild>
            <Button id="close-company-drawer" type="button" variant="outline" className="w-full sm:w-auto mx-auto border-slate-300 text-slate-600 font-semibold bg-white">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
