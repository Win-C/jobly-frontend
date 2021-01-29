import "./CompanyCard.css";

/** Renders CompanyCard
 * 
 *  Props:
 *  - company: object like
 *  { handle, name, description, numEmployees, logoUrl, jobs }
 * 
 *  CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {

  return (
    <div className="CompanyCard border border-primary col-10 col-sm-8 col-md-6 mx-auto mt-3">
      <p className="compName font-weight-bold mt-3 position-relative">{company.name}</p>
      <img src={company.logoUrl} alt="logo" className="compLogo"/>
      <p className="compDescription">{company.description}</p>
    </div>
  );
}

export default CompanyCard;