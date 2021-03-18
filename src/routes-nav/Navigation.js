import { NavLink } from "react-router-dom";
import "./Navigation.css";

/** Renders Navigation component. Shows up on every page.
 *  
 *  When user is logged in, shows links to main areas of site.
 *  When user is not logged in, shows link to Login and Signup forms.
 *
 *  Props:
 *  - user: object containing data for current user
 *  - logoutUser: fn passed down by parent (App) to handle logging out user
 *
 *  App -> { Navigation, Routes }
 */
function Navigation({ user, logoutUser }) {
  console.debug("Navigation");

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/companies" className="nav-link">
            Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/jobs" className="nav-link">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" onClick={logoutUser} className="nav-link">
            Logout {user.firstName || user.username}
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
              </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Sign Up
              </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <NavLink exact to="/" className="navbar-brand">
        Jobly
      </NavLink>
      {user ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
