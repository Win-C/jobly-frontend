import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. 
   * 
   *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
   *  where jobs is [{ id, title, salary, equity }, ...]
   *
   *  Authorization required: none
   *  */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. 
   *  
   *  Returns 
   *  => { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
   * 
   * Can filter on provided search filter data for company name
   *
   * Authorization required: none
   *  */

  static async getAllCompanies(data) {
    let res = data.name
      ? await this.request(`companies/`, data)
      : await this.request(`companies/`);

    return res.companies;
  }

  /** Get all jobs. 
   *  
   *  => { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
   * 
   * Can filter on provided search filter data for job title
   *
   * Authorization required: none
   *  */

  static async getAllJobs(data) {
    let res = data.title
      ? await this.request(`jobs/`, data)
      : await this.request(`jobs/`);

    return res.jobs;
  }

  /** Sign up a user. 
   *  
   * user must include { username, password, firstName, lastName, email }
   * 
   * Returns JWT token: { token }
   *
   * Authorization required: none
   *  */

  static async signupUser(user) {
    let res = await this.request(`auth/register/`, user, "post");
    return res.token;
  }

  /** Login a user. 
   *  
   *  Sends userData { username, password }
   * 
   *  Returns JWT token: { token }
   *
   * Authorization required: none
   *  */

  static async loginUser(userData) {
    let res = await this.request(`auth/token/`, userData, "post");
    return res.token;
  }

  /** GET /[username] => { user }
   *
   * Returns { username, firstName, lastName, isAdmin, applications }
   *   where applications is [ id, ... ]
   *
   * Authorization required: admin or same user-as-:username
   **/

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** PATCH /[username] { userData } => { user }
   *
   * data includes:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Authorization required: admin or same-user-as-:username
   **/

  static async updateUser({ username, ...data}) {
    let res = await this.request(
      `users/${username}`,
      data,
      "patch"
    );
    return res.user;
  }
  
  /** POST /[username]/jobs/[id]  { state } => { application }
   *
   * Returns {"applied": jobId}
   *
   * Authorization required: admin or same-user-as-:username
   * */
  
  static async applyToJob(username, jobId) {
    let res = await this.request(
      `users/${username}/jobs/${jobId}`,
      { username, jobId },
      "post"
      );
    return res;
  }

}

export default JoblyApi;