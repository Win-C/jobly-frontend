import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import jwt from "jsonwebtoken";


/** Renders Jobly App
 *  
 *  TODO: TBU
 *  state:
 *  - user: user's account information from backend, an object like -
 *      { username, firstName, lastName, isAdmin, applications } 
 *    where applications is array of job ids like:
 *      [ id, etc. ]
 *  - token: JWT token for authorization
 * 
 *  App -> { Navigation, Routes }
 */
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  console.debug(
    "On App render:",
    "infoLoaded =", infoLoaded,
    "user = ", user,
    "token = ", token,
  )

  /** Get user's account info from the backend that's an object like:
   *  { username, firstName, lastName, isAdmin, applications }
   *   where applications is [ id, ... ]
   */
  useEffect(function fetchUserOnTokenChange() {
    console.debug("App useEffect fetchUser", "token=", token);
  
    async function fetchUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // setting token in Api class to be used for Api calls
          JoblyApi.token = token;
          localStorage.setItem("token", token);
          let currUser = await JoblyApi.getUser(username);
          setUser(currUser);
        } catch (err) {
          console.error("App fecthUser: problem loading", err);
          setUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // infoLoaded being used here while making async calls to Api when the 
    // data is fetched or an error occurs, this will be set to false to control
    // the spinner
    setInfoLoaded(false);
    fetchUser();
  }, [token]);

  /** Sign up new user with data inputs like
   *  { username, password, firstName, lastName, email } 
   *  Returns JWT token for new user
   *  */
  async function signupUser(data) {
    try {
      let token = await JoblyApi.signupUser(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** Login user with data inputs { username, password }
   *  Returns JWT token for user
   * */
  async function loginUser(data) {
    try {
      let token = await JoblyApi.loginUser(data);
      setToken(token);
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  /** Logout user by returning states to initial states */
  function logoutUser() {
    setUser(null);
    setToken(null);
    localStorage.setItem("token", null);
  }

  /** TODO: Add check if a job has been applied for */
  // function hasAppliedToJob(){}

  /** TODO: Adds job id to applications for user */
  // function applyToJob(jobId) {}

  // TODO: Add loading spinner
  if (!infoLoaded) return <i>Loading...</i>;

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation user={user}
          logoutUser={logoutUser}
        />
        <Routes
          user={user}
          signupUser={signupUser}
          loginUser={loginUser}
          // updateUser={updateUserInfo}
          // applyToJob={applyToJob}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
