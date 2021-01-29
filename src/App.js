import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";

/** Renders Jobly App
 *  
 *  state:
 *  - user: object like -
 *      { username, 
 *        firstName, 
 *        lastName, 
 *        isAdmin, 
 *        applications
 *      } 
 *    where applications is array of job ids like:
 *      [ id, etc. ]
 *  - token: string of JWT token for user
 *  - error: array of error messages
 * 
 *  App -> { NavBar, Routes }
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState([]);

  console.log("rendering user = ", user);

  JoblyApi.token = token;

  /** Get JWT token with user's username
   *  */
  async function getUser(username){
    try {
      const currUser = await JoblyApi.getUser(username);
      setUser(currUser);
    } catch (err) {
      setError(err);
    }
  }

  /** Sign up new user where user input is an object like
   *  { username, password, firstName, lastName, email } 
   *  */
  async function signupUser(user) {
    try {
      const resp = await JoblyApi.signupUser(user);
      setToken(resp);
      await getUser(user.username);
    } catch (err) {
      setError(err);
    }
  }

  /** Login user by using provided user is an object like 
   *  { username, password }
   * */
  async function loginUser(user) {
    try {
      const resp = await JoblyApi.loginUser(user);
      setToken(resp);
      await getUser(user.username);
    } catch (err) {
      setError(err);
    }
  }

  /** Update user by using provided userUpdates which is an object like
   *  { firstName, lastName, password, email }
   *  */
  async function updateUser(userUpdates) {
    try {
      await JoblyApi.updateUser(user.username, userUpdates);
      const updatedUser = await getUser(user.username);
      setUser(updatedUser);
    } catch (err){
      setError(err);
    }
  }

  /** Logout user by returning user to initialState */
  function logoutUser() {
    setUser(null);
    setToken("")
  }

  /** Adds job id to applications for user */
  async function applyToJob(jobId) {
    try {
      await JoblyApi.applyToJob(user.username, jobId);
      const updatedUser = await getUser(user.username);
      setUser(updatedUser);
    } catch (err) {
      setError(err);
    }
  }

  // TODO: Show error messages to user
  if (error) console.log(error);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}
          logoutUser={logoutUser}
        />
        <Routes
          user={user}
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
