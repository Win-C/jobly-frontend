# Jobly (frontend)

Jobly is a full stack web application of a mock job board site where users can sign up and login. Logged in users gain access to a list of companies with search and filtering capabilities. Each company has a list of job postings that a user can view. A user may apply to a job posting, but each user is restricted from duplicate applications to a single job posting posted by a company.

Check out the deployed frontend <a href="http://hilarious-cobweb.surge.sh">here</a>.

For **backend** related documentation and commentary, please go <a href="https://github.com/Win-C/jobly-backend">here</a>.

## Screenshots

Below are screenshots of the deployed app:

<img src="/static/images/jobly-homepage-screenshot.png" width="600" height="300">
<img src="/static/images/jobly-jobs-screenshot.png" width="600" height="400">

**React Component Hierarchy**

<img src="/static/images/jobly-react-component-hierarchy.png" width="700" height="400">

## Current features
- Users can log in, sign up and log out (authentication and registration is handled by the backend routes)
- User navigation routes include:
    - "/" - Homepage with a simple welcome message for that user
    - "/companies" - List of all companies with search filtering capabilities
    - "/companies/apple" - View details of this company
    - "/jobs" - List of all jobs
    - "/login" - login/signup
    - "/signup" - signup form
    - "/profile" - edit profile page
- Protected routes exist so a user needs to be logged in to access companies page, jobs page, and company details page

## Upcoming features
- Collapsed and expandable navbar
- Logged-in user can edit their profile
- Logged-in user can apply for jobs (using the backend endpoint for this)
- Testing with AJAX using React Testing Library
- Pagination
- Live Search
- Un-Apply to Jobs
- Show a List of Companies Applied To
- Add Edit Form for Companies

## Tech stack
- PostgreSQL for database
- Express.js / Node.js for backend
- React for frontend

## Dependencies

**Frontend dependencies** include:
- axios for requests
- bootstrap for styling
- jest *(ships with CRA)*
- jsonwebtoken for security
- react-router-dom for routing

## Installation

**Frontend Development Setup**

Make sure you're in the correct folder. Then go ahead and install the dependencies and start the application:
```console
npm install
npm start
```

## Deployment

We used surge.sh to deploy our frontend static website. Note: for backend deployment, please visit the backend repo. 

Firstly, ensure you have the surge command installed. You can do this globally for ease of access anywhere in the Terminal:

```console
npm install --global surge
```

In your JoblyApi.js and anywhere else that you may make requests to localhost:3001, make sure you have the following:

```javascript
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
```

Make sure to define the environment variable for your frontend app.
Then run the following commands in the Jobly frontend folder:

```console
REACT_APP_BASE_URL=YOUR_HEROKU_BACKEND_URL npm run build
cp build/index.html build/200.html
surge build
```

## Authors
- Winnie Chou
- Kellen Rowe (pair programming partner)