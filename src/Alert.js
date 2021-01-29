/** Renders Alert component
 * 
 *  Props:
 *  - error message
 * 
 *  { LoginForm, SignupForm, ProfileForm } -> Alert
 */

// TODO: Needs to be built out
function Alert({ error }) {

  return (
    <div className="Alert">
      <p><b>Alert!</b> {error}</p>
    </div>
  );
}

export default Alert;