import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import StoryMapper from '../StoryMapper/index'
import PostMapper from '../PostMapper/index'
import FailureView from '../CommonFailureVIew/index'
import './index.css'

const apiConstants = {
  initial: 'I',
  loading: 'L',
  success: 'S',
  failure: 'F',
}

class UserProfile extends Component {
  state = {user: {}, stories: [], posts: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.makeUserProfileApiCall()
  }

  repeatAPiCall = () => {
    this.makeUserProfileApiCall()
  }

  makeUserProfileApiCall = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    console.log(params)
    const url = `https://apis.ccbp.in/insta-share/users/${params.id}`
    const jwtToken = Cookies.get('jwt_token')
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
        user: jsonResponse.user_details,
        stories: jsonResponse.user_details.stories,
        posts: jsonResponse.user_details.posts,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  NoPostView = () => (
    <div className="noPostView">
      <BiCamera className="biCameraIcon" />
      <h1 className="noPostPara">No Posts</h1>
    </div>
  )

  SuccessView = () => {
    const {user, stories, posts} = this.state

    return (
      <>
        <div className="UserProfileContainer">
          <img
            src={user.profile_pic}
            alt="user profile"
            className="userProfileImageBig"
          />
          <div className="user-profile-sub-container">
            <h1 className="userProfileUserName">{user.user_name}</h1>
            <div className="user-profile-details">
              <img
                src={user.profile_pic}
                alt="user profile"
                className="userProfileImageSmall"
              />
              <div className="span-para">
                <div className="ZZ">
                  <span>{user.posts_count}</span>
                  <p className="userProfileCommonPara">posts</p>
                </div>
                <div className="ZZ">
                  <span>{user.followers_count}</span>
                  <p className="userProfileCommonPara">followers</p>
                </div>
                <div className="ZZ">
                  <span>{user.following_count}</span>
                  <p className="userProfileCommonPara">following</p>
                </div>
              </div>
            </div>
            <p className="userProfileUser-id">{user.user_id}</p>
            <p className="user-bio">{user.user_bio}</p>
          </div>
        </div>
        <div className="story-container-new">
          <ul className="UserStoryImagesContainer">
            {stories.map(eachStory => (
              <StoryMapper
                key={eachStory.id}
                detail={eachStory}
                altVal="user story"
              />
            ))}
          </ul>
        </div>
        <hr className="horizontalLine" />
        <div className="iconsPost">
          <BsGrid3X3 className="gridIcon" />
          <h1 className="userPosts">Posts</h1>
        </div>

        {posts.length !== 0 && (
          <div className="post-item-new">
            <ul className="userProfilePostContainer">
              {posts.map(eachPost => (
                <PostMapper
                  key={eachPost.id}
                  detail={eachPost}
                  altVal="user post"
                />
              ))}
            </ul>
          </div>
        )}
        {posts.length === 0 && this.NoPostView()}
      </>
    )
  }

  renderUserProfileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return (
          <div className="loader-container-userProfile">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiConstants.failure:
        return <FailureView respectiveFunction={this.repeatAPiCall} />
      case apiConstants.success:
        return this.SuccessView()
      default:
        return null
    }
  }

  render() {
    return this.renderUserProfileViews()
  }
}
export default UserProfile
