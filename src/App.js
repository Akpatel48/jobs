import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CareerSiteDescription from "./pages/SubDomain/CareerSiteDescription"
import SingleJobView from "./pages/SubDomain/SingleJobView"
import JobApplication from "./pages/SubDomain/JobApplication"
import JobsPage from "./pages/SubDomain/JobsPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NewcreateCandidate from './pages/NewcreateCandidate';
import LandingPage from "./pages/LandingPage";
import CandidateRegistrationForm from "./pages/CandidateRegistrationForm";
import AllCompanies from './pages/AllCompanies';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login"
            element={<Login />}
          >
          </Route>
          <Route exact path="/register"
            element={<Register />}
          >
          </Route>
          <Route exact path="/candidate"
            element={<NewcreateCandidate />}
          >
          </Route>
          <Route exact path="/registrationform"
            element={<CandidateRegistrationForm />}
          >
          </Route>
          <Route exact path="/"
            element={<LandingPage />}>
          </Route>
          <Route exact path="/jobs"
            element={<JobsPage />}>
          </Route>
          <Route exact path="/jobs/:id/:name"
            element={<CareerSiteDescription />}>
          </Route>
          <Route exact path="/jobs/Careers/:id/:title"
            element={<SingleJobView />}>
          </Route>
          <Route exact path="/JobApplication/:webform"
            element={<JobApplication />}>
          </Route>
          <Route path="/all-companies" 
          element={<AllCompanies/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
