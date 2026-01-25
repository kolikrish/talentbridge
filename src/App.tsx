import { Route, Routes } from "react-router-dom"
import MyJobs from "./pages/MyJobs"
import SavedJob from "./pages/SavedJob"
import PostJob from "./pages/PostJob"
import Landing from "./pages/Landing"
import Onboarding from "./pages/Onboarding"
import JobListing from "./pages/JobListing"
import Job from "./pages/Job"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/onboarding" element={<Onboarding />}/>
        <Route path="/jobs" element={<JobListing />}/>
        <Route path="/job/:id" element={<Job />}/>
        <Route path="/post-job" element={<PostJob />}/>
        <Route path="/saved-jobs" element={<SavedJob />}/>
        <Route path="/my-jobs" element={<MyJobs />}/>
      </Routes>
    </div>
  )
}

export default App