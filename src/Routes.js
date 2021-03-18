import { Switch, Redirect, Route } from "react-router-dom";

import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";
import PrivateRoute from "./routes-nav/PrivateRoute";

/** Renders Routes component. 
 *  TODO: TBU
 *  Parts of the site are only visible to logged-in users. 
 *  These routes are wrapped by <PrivateRoute>, which is an 
 *  authorization component.
 * 
 *  Visiting non-existant route redirects to the homepage.
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
function Routes({ user, signupUser, loginUser }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  )

  // Create userJobs an array of job ids for applications submitted by the user
  const userJobs = user
    ? user.applications
    : null;
  
  return (
    <Switch>

      <Route exact path="/">
        <Homepage user={user}/>
      </Route>

      <Route exact path="/login">
        <LoginForm loginUser={loginUser} />
      </Route>

      <Route exact path="/signup">
        <SignupForm signupUser={signupUser} />
      </Route>

      <PrivateRoute exact path="/companies">
        <CompanyList />
      </PrivateRoute>

      <PrivateRoute exact path="/jobs">
        <JobList userJobs={userJobs} />
      </PrivateRoute>

      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetail userJobs={userJobs} />
      </PrivateRoute>

      <PrivateRoute exact path="/profile">
        <ProfileForm user={user} />
      </PrivateRoute>

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;