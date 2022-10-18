import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Context from '../../context/context'
import './index.css'

class Header extends Component {
  state = {
    searchInputValue: '',
    showHam: false,
    showSearch: false,
    activeId: false,
    emptySpace: false,
  }

  LogoutUser = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  setSearchValue = event => {
    this.setState({searchInputValue: event.target.value})
  }

  showHamMenu = () => {
    this.setState(prev => ({
      showHam: !prev.showHam,
      showSearch: false,
    }))
  }

  ShowSearchBar = () => {
    this.setState(prev => ({
      showHam: !prev.showHam,
      showSearch: true,
    }))
  }

  changeTab = () => {
    this.setState(prev => ({activeId: !prev.activeId}))
  }

  onClickLogo = () => {
    this.setState({activeId: false})
  }

  render() {
    const {searchInputValue, showHam, showSearch, activeId} = this.state
    const classStyle = activeId ? '' : 'xClass'
    const classStyleTwo = activeId ? 'xClass' : ''

    return (
      <Context.Consumer>
        {value => {
          const {searchFunction, revert} = value

          const onClickSearchButton = () => {
            searchFunction(searchInputValue)
          }
          const revertChanges = () => {
            this.changeTab()
            revert()
          }

          // testid="searchIcon"   testid="searchIcon"

          return (
            <nav>
              <ul className="navListContainer">
                <li className="logoAndWebsiteContainer">
                  <Link to="/" className="lnk-items" onClick={this.onClickLogo}>
                    <img
                      src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663059601/instaShare/Standard_Collection_84xjpg_nfatml.jpg"
                      alt="website logo"
                      className="navLogo"
                    />
                  </Link>
                  <h1 className="websiteHeader">Insta Share</h1>
                </li>

                <li className="linkAndSearchContainer">
                  <div className="searchBarContainer">
                    <input
                      type="search"
                      className="searchInput"
                      placeholder="Search Caption"
                      onChange={this.setSearchValue}
                      value={searchInputValue}
                    />
                    <button
                      type="button"
                      className="searchButton"
                      onClick={onClickSearchButton}
                    >
                      <FaSearch />
                    </button>
                  </div>

                  <div className="thirdListItems">
                    <Link to="/" className="lnk-items" onClick={revertChanges}>
                      <p className={`homeLink ${classStyle}`}>Home</p>
                    </Link>

                    <Link
                      to="/my-profile"
                      className="lnk-items"
                      onClick={this.changeTab}
                    >
                      <p className={`profileLink ${classStyleTwo}`}>Profile</p>
                    </Link>
                    <button
                      className="logoutButton"
                      type="button"
                      onClick={this.LogoutUser}
                    >
                      Logout
                    </button>
                  </div>
                </li>

                <li className="hamButtonMenuContainer">
                  <button type="button" onClick={this.showHamMenu}>
                    <GiHamburgerMenu className="hamButton" />
                  </button>
                </li>
              </ul>
              {showHam && (
                <ul className="Ham-Menu">
                  <Link
                    to="/"
                    className="lnk-items"
                    onClick={this.revertChanges}
                  >
                    <li className={`common-link-class ${classStyle}`}>Home</li>
                  </Link>
                  <li>
                    <button
                      type="button"
                      onClick={this.ShowSearchBar}
                      className="common-link-class"
                    >
                      Search
                    </button>
                  </li>
                  <Link
                    to="/my-profile"
                    className="lnk-items"
                    onClick={this.changeTab}
                  >
                    <li className={`common-link-class ${classStyleTwo}`}>
                      Profile
                    </li>
                  </Link>
                  <li>
                    <button
                      type="button"
                      onClick={this.LogoutUser}
                      className="ham-menu-logout-button"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={this.showHamMenu}>
                      <AiFillCloseCircle className="closeIcon" />
                    </button>
                  </li>
                </ul>
              )}
              {showSearch && (
                <div className="searchBarContainerSm">
                  <input
                    type="search"
                    className="searchInput"
                    placeholder="Search Caption"
                    onChange={this.setSearchValue}
                    value={searchInputValue}
                  />
                  <button
                    type="button"
                    className="searchButton"
                    onClick={onClickSearchButton}
                  >
                    <FaSearch />
                  </button>
                </div>
              )}
            </nav>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default withRouter(Header)
