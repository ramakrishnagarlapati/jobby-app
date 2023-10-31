import './index.css'

function FailureView({onClickFailureRetryBtn}) {
  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={onClickFailureRetryBtn}
      >
        Retry
      </button>
    </div>
  )
}
export default FailureView
