import { useState } from "react";
import { useHistory } from "react-router-dom";

/** Renders ProfileForm component
 * 
 *  Props:
 *  - updateUser: fn passed down from parent to update user data
 *  - user: object with current user data
 * 
 *  State:
 *  - formData: input recieved from user
 * 
 *  Routes -> ProfileForm -> Alert
 *  
 * */
function ProfileForm({ updateUser, user }) {
  const initialFormData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  /** updates formData on change of input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    updateUser(formData);
    setFormData(initialFormData);
    history.push("/");
  }

  return (
    <form className="ProfileForm mx-auto col-6" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username"><b>Username</b></label>
        <p>{user.username}</p>

        <label htmlFor="ProfileForm-firstName">First Name</label>
        <input
          id="ProfileForm-firstName"
          name="firstName"
          className="form-control"
          onChange={handleChange}
          value={formData.firstName}
          aria-label="firstName"
        />
        <label htmlFor="ProfileForm-lastName">Last Name</label>
        <input
          id="ProfileForm-lastName"
          name="lastName"
          className="form-control"
          onChange={handleChange}
          value={formData.lastName}
          aria-label="lastName"
        />
        <label htmlFor="ProfileForm-email">Email</label>
        <input
          id="ProfileForm-email"
          name="email"
          className="form-control"
          onChange={handleChange}
          value={formData.email}
          aria-label="email"
        />
        <label htmlFor="ProfileForm-password">Confirm password to save changes:</label>
        <input
          id="ProfileForm-password"
          name="password"
          className="form-control"
          onChange={handleChange}
          aria-label="password"
          type="password"
        />
      </div>
      <div>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </form>
  );
}

export default ProfileForm;