import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {GoAlert} from 'react-icons/go'
import Context from '../../context/context'
import SearchResult from '../SearchResultsComponent/index'
import Stories from '../Stories/index'
import PostItems from '../PostItems/index'
import './index.css'

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
  ],
}
const apiStatusConstants = {
  initial: 'I',
  loading: 'L',
  success: 'S',
  failure: 'F',
}

class Home extends Component {
  state = {
    stories: [],
    storiesApiStatus: '',
    posts: [],
    postApiStatus: '',
  }

  componentDidMount() {
    this.makeStoriesApiCall()
    this.makeFeedsApiCall()
  }

  makeStoriesApiCall = async () => {
    this.setState({storiesApiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const responseJson = await response.json()
    if (response.ok) {
      this.setState({
        stories: responseJson.users_stories,
        storiesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({storiesApiStatus: apiStatusConstants.failure})
    }
    console.log(responseJson)
  }

  makeFeedsApiCall = async () => {
    this.setState({postApiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const jsonResponse = await response.json()
    if (response.ok) {
      this.setState({
        posts: jsonResponse.posts,
        postApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({postApiStatus: apiStatusConstants.failure})
    }
  }

  // testid="loader"
  makeStoriesCall = () => {
    this.makeStoriesApiCall()
  }

  makePostsApiCall = () => {
    this.makeFeedsApiCall()
  }

  storiesFailureView = () => (
    <div className="storiesFailureView">
      <img
        src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663158061/instaShare/Group_7522failure_evpahh.png"
        alt="failure view"
        style={{width: '25%'}}
      />
      <GoAlert className="goAlertIcon" />
      <p className="errorParaStories">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retryButtonStories"
        onClick={this.makeStoriesCall}
      >
        Try Again
      </button>
    </div>
  )

  // testid="loader"

  renderStoriesView = () => {
    const {stories, storiesApiStatus} = this.state

    switch (storiesApiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container">
            <Loader type="TailSpin" color="#4094EF" height={40} width={40} />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <Slider {...settings} accessibility focusOnSelect>
            {stories.map(each => (
              <Stories key={each.user_id} data={each} />
            ))}
          </Slider>
        )
      case apiStatusConstants.failure:
        return this.storiesFailureView()
      default:
        return null
    }
  }

  PostsFailureView = () => (
    <div className="postsFailureViewContainer">
      <img
        src="https://res.cloudinary.com/dtdoc35lb/image/upload/v1663158061/instaShare/Group_7522failure_evpahh.png"
        alt="failure view"
        style={{width: '35%'}}
      />
      <GoAlert className="goAlertIcon" />
      <p className="errorParaPosts">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retryButtonPosts"
        onClick={this.makePostsApiCall}
      >
        Try Again
      </button>
    </div>
  )

  // testid="loader"

  renderPostsViews = () => {
    const {postApiStatus, posts} = this.state
    switch (postApiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container-posts">
            <Loader type="TailSpin" color="#4094EF" height={40} width={40} />
          </div>
        )
      case apiStatusConstants.success:
        return (
          <>
            {posts.map(each => (
              <PostItems key={each.post_id} detail={each} />
            ))}
          </>
        )
      case apiStatusConstants.failure:
        return this.PostsFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <Context.Consumer>
        {value => {
          const {searchStatus, sQuery} = value

          return (
            <div className="HomeContainer">
              {sQuery.length === 0 && (
                <>
                  <ul className="storiesContainer">
                    {this.renderStoriesView()}
                  </ul>
                  <hr className="hr" />
                  <div className="post-item">
                    <ul className="PostItemsContainer">
                      {this.renderPostsViews()}
                    </ul>
                  </div>
                </>
              )}
              {sQuery !== '' && (
                <SearchResult query={sQuery} searchStatus={searchStatus} />
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Home
