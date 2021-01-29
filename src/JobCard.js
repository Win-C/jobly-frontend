import { useHistory } from "react-router-dom";

import "./JobCard.css";

/** Renders JobCard component
 * 
 *  Props:
 *  - job is an object of either (depending on which parent calls)
 *      { id, title, salary, equity } from grandparent CompanyDetail or
 *      { id, title, salary, equity, companyHandle, companyName } from 
 *        grandparent JobList
 *  - isApplied is a Boolean value
 *      true, if user has applied to the job
 *      false, otherwise
 *  - applyToJob is a fn passed down by parent to update user's joblist
 * 
 *  JobCardList -> JobCard 
 */

function JobCard({ job, isApplied, applyToJob }) {
  const history = useHistory();

  /** updates user's list of applied jobs */
  function handleClick(evt) {
    applyToJob(job.id);
    history.push("/jobs");
  }

  const showButton = (!isApplied)
    ? <button className="btn btn-danger mb-3 ml-3" onClick={handleClick}>APPLY</button>
    : <button className="btn btn-danger disabled mb-3 ml-3">APPLIED</button>;

  const showCompanyName = job.companyHandle
    ? <p className="ml-3">
      {job.companyName}
      </p>
    : null;

  return (
    <div className="JobCard border border-primary mx-auto mt-3">
      <p className="jobTitle ml-3 mt-3 font-weight-bold">{job.title}</p>
      {showCompanyName}
      <p className="jobTitle ml-3">Salary: {job.salary}</p>
      <p className="jobTitle ml-3">Equity: {job.equity}</p>
      {showButton}
    </div>
  );
}

export default JobCard;