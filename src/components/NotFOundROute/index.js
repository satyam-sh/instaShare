import './index.css'

const NotFound = props => {
  const gotoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="NotFound">
      <img
        src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663181590/instaShare/erroring_1notfound_pgygyy.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="notFound-para">
        we are sorry, the page you requested could not be found. Please go back
        to homepage.
      </p>
      <button type="button" className="homePage-btn" onClick={gotoHome}>
        Home Page
      </button>
    </div>
  )
}
export default NotFound
