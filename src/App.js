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
 *      if signing up, like { username, password, firstName, lastName, email } 
 *      if logging in, like { username, password } 
 *  - userCredentials: object with user's username and JWT token for authorization
 *      { username, token }
 *  - error: array of error messages
 *  - isLoading: Boolean value w/ default of true
 * 
 *  App -> { NavBar, Routes }
 */
function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [currUser, setCurrUser] = useState({});
  const [userCredentials, setUserCredentials] = useState(null);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  JoblyApi.token = userCredentials ? userCredentials.token : null;


  /** Get JWT token for either new user upon sign up or for returning user on log in */
  useEffect(function fetchTokenForCurrentUser() {
    async function fetchToken() {
      const numFields = Object.keys(currUser).length;
      try {
        if (numFields === 5) {
          const resp = await JoblyApi.signupUser(currUser);
          const newCredentials = { username: currUser.username, token: resp };
          setUserCredentials(newCredentials);
        }
        if (numFields === 2) {
          const resp = await JoblyApi.loginUser(currUser);
          const newCredentials = { username: currUser.username, token: resp };
          setUserCredentials(newCredentials);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchToken();
  }, [currUser]);

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
    }
    fetchUserAccount();
  }, [userCredentials]);

  /** Sign up new user with current user inputs with number of fields = 5:
   *  { username, password, firstName, lastName, email } 
   *  */
  function signupUser(currUser) {
    setCurrUser(currUser);
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
    setError(null);
  }

  /** Update user by using user's updates which is an object like
   *  { firstName, lastName, password, email }
   *  */
  async function updateUser(userUpdates) {
    try {
      await JoblyApi.updateUser(userAccount.username, userUpdates);
      setUserCredentials((oldCredentials) => ({
        ...oldCredentials,
        username: userAccount.username
      }));
    } catch (err) {
      setError(err);
    }
  }

  /** Adds job id to applications for user */
  async function applyToJob(jobId) {
    try {
      await JoblyApi.applyToJob(userAccount.username, jobId);
      setUserCredentials((oldCredentials) => ({
        ...oldCredentials,
        username: userAccount.username
      }));
    } catch (err) {
      setError(err);
    }
  }

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
