import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { Search, X, SlidersHorizontal } from "lucide-react";

import JobCard from "@/components/job-card";
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

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) fnCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  const hasFilters = searchQuery || location || company_id;

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#0f172a" />;
  }

  return (
    <div className="pb-10 font-['Gilroy']">
      {/* Page Header */}
      <div className="mb-12 text-center pt-8">
        <h1 className="text-5xl font-light text-slate-900 leading-none mb-6 tracking-tight">
          Browse <span className="font-bold">Listings.</span>
        </h1>
        <p className="text-slate-400 text-base font-normal max-w-lg mx-auto leading-relaxed">
          Find the perfect role that matches your skills and professional ambitions.
        </p>
      </div>

      {/* Search Bar - Modernized */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-4xl mx-auto mb-10"
      >
        <div className="relative flex-1 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <Input
            type="text"
            placeholder="Search jobs by title, keyword..."
            name="search-query"
            className="pl-12 h-14 bg-white border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] focus:shadow-xl focus:shadow-slate-100 transition-all duration-300 text-base"
          />
        </div>
        <Button type="submit" className="h-14 px-10 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold transition-all duration-300 shadow-lg shadow-slate-100 hover:shadow-xl">
          Search
        </Button>
      </form>

      {/* Filters Row - Modernized */}
      <div className="flex flex-col gap-6 mb-10 max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-slate-500 text-xs font-bold uppercase tracking-widest shrink-0 border border-slate-100/50">
            <SlidersHorizontal size={14} />
            Filters
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="flex-1 min-w-[180px]">
              <Select value={location} onValueChange={(value) => setLocation(value)}>
                <SelectTrigger className="h-12 bg-white rounded-xl border-slate-100 shadow-sm">
                  <SelectValue placeholder="Locations" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name} className="rounded-lg">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[180px]">
              <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
                <SelectTrigger className="h-12 bg-white rounded-xl border-slate-100 shadow-sm">
                  <SelectValue placeholder="Companies" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={name} value={id} className="rounded-lg">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {hasFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="gap-2 text-slate-400 hover:text-slate-900 h-12 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
              >
                <X size={15} />
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#0f172a" />
      )}

      {/* Results */}
      {loadingJobs === false && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 text-sm">
              {jobs?.length
                ? `${jobs.length} job${jobs.length > 1 ? "s" : ""} found`
                : ""}
            </p>
          </div>
          {jobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No jobs found</h3>
              <p className="text-slate-500 mb-5">Try adjusting your search or filters.</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobListing;
