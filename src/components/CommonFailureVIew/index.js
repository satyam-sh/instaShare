import './index.css'

const FailureView = props => {
  const {respectiveFunction} = props
  const makeAPICall = () => {
    respectiveFunction()
  }
  return (
    <div className="CommonFailureViewContainer">
      <img
        src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663158237/instaShare/Group_7522failurejpg_kmvee2.jpg"
        alt="failure view"
        className="failureImage"
      />
      <p className="failurePara">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failureTryAgainButton"
        onClick={makeAPICall}
      >
        Try Again
      </button>
    </div>
  )
}
export default FailureView
