/** Renders Alert component
 * 
 *  Props:
 *  - error message
 * 
 *  { LoginForm, SignupForm, ProfileForm } -> Alert
 */
function Alert({ error }) {

  return (
    <div className="Alert">
      <p><b>Alert!</b> {error}</p>
    </div>
  );
}

export default Alert;