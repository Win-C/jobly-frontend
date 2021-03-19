import { useState } from "react";
import { useHistory } from "react-router-dom";

/** Renders LoginForm component
 * 
 *  Props:
 *  - loginUser: fn passed from parent to update user data
 * 
 *  State:
 *  - formData: input recieved from user
 * 
 *  Routes -> LoginForm -> Alert
 *  
 * */

function LoginForm({ loginUser }) {
  const initialState = {
    username: "",
    password: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login = ", typeof login,
    "formData = ", formData,
    "formErrors", formErrors,
  )

  /** updates formData on change of input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** handles submission of form for user login */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await loginUser(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  return (
    <form className="LoginForm mx-auto col-6" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="LoginForm-username">Username</label>
        <input
          id="LoginForm-username"
          name="username"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="LoginForm-password"
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="btn btn-primary">Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;