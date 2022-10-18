import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errorMessage: ''}

  onSubmitForm = event => {
    event.preventDefault()
    this.LoginApiCall()
  }

  setUserName = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  LoginApiCall = async () => {
    const {history} = this.props
    const {username, password} = this.state
    const User = {username, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(User),
    }
    const loginResponse = await fetch(loginUrl, options)
    const jsonResponse = await loginResponse.json()
    if (loginResponse.ok) {
      Cookies.set('jwt_token', jsonResponse.jwt_token, {expires: 30})

      history.replace('/')
    } else {
      console.log(jsonResponse.error_msg)
      this.setState({
        errorMessage: jsonResponse.error_msg,
        username: '',
        password: '',
      })
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMessage} = this.state
    return (
      <div className="LoginPageContainer">
        <img
          src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663059508/instaShare/Layer_24x_plojnn.jpg"
          alt="website login"
          className="login-page-main-image"
        />
        <div className="formContainer">
          <img
            src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663059601/instaShare/Standard_Collection_84xjpg_nfatml.jpg"
            alt="website logo"
            className="websiteLogo"
          />
          <h1 className="websiteNameHeading">Insta Share</h1>
          <form onSubmit={this.onSubmitForm}>
            <div className="inputAndLabelContainer">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                className="inputText"
                onChange={this.setUserName}
                value={username}
              />
            </div>
            <div className="inputAndLabelContainer">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                className="inputPassword"
                onChange={this.setPassword}
                value={password}
              />
            </div>
            {errorMessage.length !== '' && (
              <p className="errorMessage">{errorMessage}</p>
            )}
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginRoute
