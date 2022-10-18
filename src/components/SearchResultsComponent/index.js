import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SearchResultMapper from '../SearchResultMapper/index'
import FailureView from '../CommonFailureVIew/index'
import Context from '../../context/context'
import './index.css'

let url = 'https://apis.ccbp.in/insta-share/posts?search=$'

const apiStatusConstants = {
  initial: 'I',
  loading: 'L',
  success: 'S',
  failure: 'F',
}

class SearchResult extends Component {
  state = {
    arr: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.doApiCall()
  }

  doApiCall = async () => {
    const {query} = this.props

    url = `https://apis.ccbp.in/insta-share/posts?search=${query}`
    console.log(url)
    this.setState({apiStatus: apiStatusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const jsonR = await response.json()

    if (response.ok) {
      this.setState({
        arr: jsonR.posts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  repeatApiCall = () => {
    this.doApiCall()
  }

  noSearchResultsView = () => (
    <div className="search-not-found-container">
      <img
        src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663241387/instaShare/Groupsearchjpg_k1c6sh.jpg"
        alt="search not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Search Not Found</h1>
      <p className="not-found-para">Try different keyword or search again</p>
    </div>
  )

  success = () => {
    const {arr} = this.state
    if (arr.length === 0) {
      return this.noSearchResultsView()
    }
    return (
      <div className="search-result-container">
        <h1 className="search-result-heading">Search Results</h1>
        <div>
          <ul className="search-item-list-container">
            {arr.map(each => (
              <SearchResultMapper key={each.post_id} detail={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  //

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container-search-results">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.success:
        return this.success()
      case apiStatusConstants.failure:
        return <FailureView respectiveFunction={this.repeatApiCall} />
      default:
        return null
    }
  }

  render() {
    return this.renderViews()
  }
}
export default SearchResult
