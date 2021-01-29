import { Switch, Redirect, Route } from "react-router-dom";

import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** Renders Routes component. 
 * 
 *  Props: 
 *  - user: object with current user data
 *  - signupUser: fn passed from parent (App) to sign up user data
 *  - loginUser: fn passed from parent (App) to login user data
 *  - updateUser: fn passed from parent (App) to update user data
 *  - applyToJob: fn passed from parent (App) to apply to a job
 * 
 *  App -> Routes -> { Homepage, CompanyList, CompanyDetail, JobList, 
 *                      LoginForm, SignupForm, ProfileForm }
*/
function Routes({ user, signupUser, loginUser, updateUser, applyToJob }) {
  
  // Create userJobs an array of job ids for applications submitted by the user
  const userJobs = user
    ? user.applications
    : null;

  // TODO: Refactor
  const showCompanies = user
    ? <CompanyList />
    : null;

  const showCompany = user
    ? <CompanyDetail userJobs={userJobs} applyToJob={applyToJob} />
    : null;

  const showJobs = user
    ? <JobList userJobs={userJobs} applyToJob={applyToJob} />
    : null;

  const showProfile = user
    ? <ProfileForm updateUser={updateUser} user={user} />
    : null;
  
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        {showCompanies}
      </Route>
      <Route exact path="/companies/:handle">
        {showCompany}
      </Route>
      <Route exact path="/jobs">
        {showJobs}
      </Route>
      <Route exact path="/login">
        <LoginForm loginUser={loginUser} />
      </Route>
      <Route exact path="/signup">
        <SignupForm signupUser={signupUser} />
      </Route>
      <Route exact path="/profile">
        {showProfile}
      </Route>
      {/* 404 handler */}
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;