import "./LoadingSpinner.css";

/** Loading spinner shown when components are fetching API data */

function LoadingSpinner() {

  return (
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner;