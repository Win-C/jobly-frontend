import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";
import Alert from "./Alert";

import jwt from "jsonwebtoken";

/** Renders Jobly App
 *  
 *  state:
 *  - user: user's account information from backend, an object like -
 *      { username, firstName, lastName, isAdmin, applications } 
 *    where applications is array of job ids like:
 *      [ id, etc. ]
 *  - token: JWT token for authorization
 *  - error: array of error messages to be shown to user
 *  - isLoading: Boolean value for loadingw/ default of true
 * 
 *  App -> { NavBar, Routes }
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.debug(
    "On App render:",
    "user = ", user,
    "token = ", token,
  )

  /** Get user's account info from the backend that's an object like:
   *  { username, firstName, lastName, isAdmin, applications }
   *   where applications is [ id, ... ]
   */
  useEffect(function fetchUserOnTokenChange() {
    async function fetchUser() {
      if (token) {
        JoblyApi.token = token;
        localStorage.setItem("token", token);
        let { username } = jwt.decode(token);
        try {
          const resp = await JoblyApi.getUser(username);
          setUser(resp);
        } catch (err) {
          setError(err);
        }
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [token, isLoading]);

  /** Sign up new user with current user inputs like
   *  { username, password, firstName, lastName, email } 
   *  Returns JWT token for new user
   *  */
  async function signupUser(currUser) {
    try {
      const resp = await JoblyApi.signupUser(currUser);
      setToken(resp);
    } catch (err) {
      setError(err);
    }
    if (!error) setIsLoading(false);
  }

  /** Login user with current user inputs { username, password }
   *  Returns JWT token for user
   * */
  async function loginUser(currUser) {
    try {
      const resp = await JoblyApi.loginUser(currUser);
      setToken(resp);
    } catch (err) {
      setError(err);
    }
    if (!error) setIsLoading(true);
  }

  /** Logout user by returning states to initial states */
  function logoutUser() {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.setItem("token", null);
    setIsLoading(true);
  }

  /** Update user by using user's updates which is an object like
   *  { firstName, lastName, password, email }
   *  */
  async function updateUserInfo(newInfo) {
    try {
      await JoblyApi.updateUser(newInfo);
    } catch (err) {
      setError(err);
    }
    if (!error) setIsLoading(true);
  }

  /** Adds job id to applications for user */
  async function applyToJob(jobId) {
    let { username } = jwt.decode(token);
    try {
      await JoblyApi.applyToJob(username, jobId);
    } catch (err) {
      setError(err);
    }
    if (!error) setIsLoading(true);
  }

  if (isLoading) return <i>Loading...</i>;

  // TODO: Flash error message and handle redirect
  const showErrorMessage = error
    ? <Alert error={error} />
    : null;

  return (
    <div className="App">
      {showErrorMessage}
      <BrowserRouter>
        <NavBar user={user}
          logoutUser={logoutUser}
        />
        <Routes
          user={user}
          signupUser={signupUser}
          loginUser={loginUser}
          updateUser={updateUserInfo}
          applyToJob={applyToJob}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
