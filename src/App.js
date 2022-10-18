import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Context from './context/context'
import SafeRoute from './components/ProtectedRoutes/index'
import LoginRoute from './components/LoginRoute/index'
import Home from './components/HomeRoute/index'
import MyProfile from './components/MyProfileRoute/index'
import UserProfile from './components/UserProfileRoute/index'
import NotFound from './components/NotFOundROute/index'
import './App.css'

class App extends Component {
  state = {sQuery: '', searchStatus: false}

  searchFunction = val => {
    this.setState({searchStatus: true, sQuery: val})
  }

  revert = () => {
    this.setState({searchStatus: false, sQuery: ''})
  }

  render() {
    const {sQuery, searchStatus} = this.state

    return (
      <Context.Provider
        value={{
          searchStatus,
          searchFunction: this.searchFunction,
          sQuery,
          revert: this.revert,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <SafeRoute exact path="/" component={Home} />
          <SafeRoute exact path="/my-profile" component={MyProfile} />
          <SafeRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
