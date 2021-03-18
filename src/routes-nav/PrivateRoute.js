import { Route, Redirect } from "react-router-dom";

/** PrivateRoute wrapper
 * 
 *  Higher-Order component that shows private routes for logged-in users
 *  - checks if there is a valid current user and only continues to the
 *  route if so
 *  - otherwise, it redirects to login form
 * 
 *  Props:
 *  - exact
 *  - path
 *  - children
 */

function PrivateRoute({ user, exact, path, children }) {
  console.debug(
    "PrivateRoute",
    "exact = ", exact,
    "path = ", path,
    "user = ", user,
  )

  if(!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path} >
      {children}
    </Route>
  );
}

export default PrivateRoute;
