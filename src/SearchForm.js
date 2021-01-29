import { useState } from "react";

/** Renders SearchForm component
 * 
 *  Prop:
 *  - updateSearch fn passed down by parent
 * 
 *  State: 
 *  - formData: input recieved from user
 * 
 *  { CompanyList, JobList } -> SearchForm
 *  */

function SearchForm({ updateSearch }) {
  const initialState = {};
  const [formData, setFormData] = useState(initialState);


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
    // console.log('formData = ', formData);
    updateSearch(formData.queryString);
    setFormData(initialState);
  }
// TODO name should be static string
  return (
    <form className="ProfileForm mx-auto" onSubmit={handleSubmit}>
      <div className="form-group input-group col-10 col-sm-8 col-md-6  mx-auto mt-5">
        <input
          placeholder="Enter search term..."
          name="queryString"
          className="form-control"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;