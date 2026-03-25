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
    return <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />;
  }

  return (
    <div className="pb-10">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl text-slate-900 mb-2">
          Browse <span className="gradient-title">Job Listings</span>
        </h1>
        <p className="text-slate-500 text-base">Find the perfect role that matches your skills and ambitions.</p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 w-full mb-4"
      >
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search jobs by title, skill, keyword..."
            name="search-query"
            className="pl-10 h-11 text-sm"
          />
        </div>
        <Button type="submit" className="h-11 px-6">
          Search
        </Button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium shrink-0">
          <SlidersHorizontal size={15} />
          Filter by:
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="flex-1">
            <Select value={location} onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All Locations" />
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
          </div>

          <div className="flex-1">
            <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All Companies" />
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

          {hasFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="gap-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 h-10"
            >
              <X size={15} />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />
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
