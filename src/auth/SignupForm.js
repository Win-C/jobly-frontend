import { useState } from "react";
import { useHistory } from "react-router-dom";

/** Renders SignupForm component
 * 
 *  Props:
 *  - signupUser: fn passed from parent to update user data
 * 
 *  State:
 *  - formData: input recieved from user
 * 
 *  Routes -> SignupForm -> Alert
 *  */
function SignupForm({ signupUser }) {
  const initialState = {};
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  /** updates formData on change of input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handle signup of new user */
  function handleSubmit(evt) {
    evt.preventDefault();
    signupUser(formData);
    setFormData(initialState);
    history.push("/companies");
  }

  return (
    <form className="SignupForm mx-auto col-6" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="SignupForm-username">Username</label>
        <input
          id="SignupForm-username"
          name="username"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="SignupForm-password">Password</label>
        <input
          id="SignupForm-password"
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="SignUpForm-firstName">First Name</label>
        <input
          id="SignUpForm-firstName"
          name="firstName"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="SignUpForm-lastName"
          name="lastName"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="SignUpForm-email"
          name="email"
          className="form-control"
          onChange={handleChange}
        />

      </div>
      <div>
        <button className="btn btn-primary">Sign Up!</button>
      </div>
    </form>
  );
}

export default SignupForm;
