import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import './index.css'

const SafeRoutes = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return (
      <div className="main-container">
        <Header />
        <Route {...props} />
      </div>
    )
  }
  return <Redirect to="/login" />
}

export default SafeRoutes
