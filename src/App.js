import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";
import Alert from "./Alert";

/** Renders Jobly App
 *  
 *  state:
 *  - userAccount: user's account information from backend, an object like -
 *      { username, firstName, lastName, isAdmin, applications } 
 *    where applications is array of job ids like:
 *      [ id, etc. ]
 *  - currUser: object of current user inputs:
 *      if signing up: { username, password, firstName, lastName, email } 
 *      if logging in: like { username, password } 
 *      if updating: like { username, password, firstName, lastName, email } 
 *  - userCredentials: object with user's username and JWT token for authorization
 *      { username, token }
 *  - newJob: string of job id to add to user's applications
 *  - error: array of error messages to be shown to user
 *  - isLoading: Boolean value w/ default of true
 *  - isSigningUp: Boolean value w/ default of false
 *  - isUpdatingUser: Boolean value w/ default of falsee
 * 
 *  App -> { NavBar, Routes }
 */
function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const [userCredentials, setUserCredentials] = useState(
    JSON.parse(localStorage.getItem("userCredentials")) || null); // Check if user exists in localStorage
  const [newJob, setNewJob] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  JoblyApi.token = userCredentials ? userCredentials.token : null;

  /** Get JWT token for either new user upon sign up or 
   *  for returning user on log in 
   *  */
  useEffect(function fetchTokenForCurrentUser() {
    async function fetchToken() {
      const numFields = Object.keys(currUser).length;
      try {
        if ((numFields === 5) && isSigningUp) {
          const resp = await JoblyApi.signupUser(currUser);
          const newCredentials = { username: currUser.username, token: resp };
          setUserCredentials(newCredentials);
          setIsSuccess(true);
        }
        if (numFields === 2) {
          const resp = await JoblyApi.loginUser(currUser);
          const newCredentials = { username: currUser.username, token: resp };
          setUserCredentials(newCredentials);
          setIsSuccess(true);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchToken();
  }, [currUser, isSigningUp]);

  // If successful signup or login then add to localStorage
  if(isSuccess) localStorage.setItem("userCredentials", JSON.stringify(userCredentials));

  /** Get user's account info from the backend that's an object like:
   *  { username, firstName, lastName, isAdmin, applications }
   *   where applications is [ id, ... ]
   */
  useEffect(function fetchUserAccountOnNewCredentials() {
    async function fetchUserAccount() {
      try {
        if (userCredentials) {
          const resp = await JoblyApi.getUser(userCredentials.username);
          setUserAccount(resp);
        }
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
      setIsSigningUp(false);
      setIsUpdatingUser(false);
      setNewJob(null);
    }
    fetchUserAccount();
  }, [userCredentials]);

  /** Update user account with new user profile inputs on the backend
   *  */
  useEffect(function updateUserAccountWithNewUserInfo() {
    async function updateUserAccount() {
      try {
        if (isUpdatingUser) {
          await JoblyApi.updateUser(currUser);
          // Trigger getting new user - is there a better way?
          setUserCredentials((oldCredentials) => ({
            ...oldCredentials,
            username: currUser.username
          }));
        }
      } catch (err) {
        setError(err);
      }
    }
    updateUserAccount();
  }, [currUser, isUpdatingUser]);

  /** Update user account's applications with new job id
   *  */
  useEffect(function updateUserAccountWithNewJob() {
    async function updateUserAccount() {
      try {
        if (newJob) {
          await JoblyApi.applyToJob(currUser.username, newJob);
          // Trigger getting new user - is there a better way?
          setUserCredentials((oldCredentials) => ({
            ...oldCredentials,
            username: currUser.username
          }));
        }
      } catch (err) {
        setError(err);
      }
    }
    updateUserAccount();
  }, [currUser, newJob]);

  /** Sign up new user with current user inputs with number of fields = 5:
   *  { username, password, firstName, lastName, email } 
   *  */
  function signupUser(currUser) {
    setCurrUser(currUser);
    setIsSigningUp(true);
  }

  /** Login user with current user inputs with number of fields = 2:
   *  { username, password }
   * */
  function loginUser(currUser) {
    setCurrUser(currUser);
  }

  /** Logout user by returning states to initial states */
  function logoutUser() {
    setUserAccount(null);
    setCurrUser({});
    setUserCredentials(null);
    setIsSigningUp(false)
    setIsUpdatingUser(false)
    setError(null);
    localStorage.setItem("userCredentials", null);
    setIsLoading(true);
  }

  /** Update user by using user's updates which is an object like
   *  { firstName, lastName, password, email }
   *  */
  function updateUser(userUpdates) {
    const { firstName, lastName, password, email } = userUpdates;
    setCurrUser(oldCurrUser => ({
      ...oldCurrUser,
      firstName,
      lastName,
      password,
      email
    }));
    setIsUpdatingUser(true);
  }

  /** Adds job id to applications for user */
  function applyToJob(jobId) {
    setNewJob(jobId);
  }

  if (isLoading) return <i>Loading...</i>;

  const showErrorMessage = error
    ? <Alert error={error} />
    : null;

  return (
    <div className="App">
      {showErrorMessage}
      <BrowserRouter>
        <NavBar user={userAccount}
          logoutUser={logoutUser}
        />
        <Routes
          user={userAccount}
          signupUser={signupUser}
          loginUser={loginUser}
          updateUser={updateUser}
          applyToJob={applyToJob}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
