import { Link } from "react-router-dom";

/** Renders Homepage component 
 *  Routes -> Homepage 
 *  */

function Homepage({ user }) {

  const showMessage = user
    ? <h3>Welcome Back, {user.firstName}!</h3>
    : (
      <div>
        <Link to="/login">
          <button className="btn btn-primary mx-2">Login</button> 
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary mx-2">Sign up</button>
        </Link>
      </div>
    );

  return (
    <div className="Homepage text-center mt-5">
      <h1><b>Jobly</b></h1>
      <p>All the jobs in one, convenient place.</p>
      {showMessage}
    </div>
  );
}

export default Homepage;