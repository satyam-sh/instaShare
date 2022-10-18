import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import StoryMapper from '../StoryMapper/index'
import PostMapper from '../PostMapper/index'
import FailureView from '../CommonFailureVIew/index'
import './index.css'

const apiStatusConstants = {
  initial: 'I',
  loading: 'L',
  success: 'S',
  failure: 'F',
}

class MyProfile extends Component {
  state = {
    myProfile: {},
    stories: [],
    posts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.makeMyProfileApiCall()
  }

  makeMyProfileApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        myProfile: jsonResponse.profile,
        stories: jsonResponse.profile.stories,
        posts: jsonResponse.profile.posts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  repeatAPICall = () => {
    this.makeMyProfileApiCall()
  }

  renderMyProfileViews = () => {
    const {apiStatus, stories, posts, myProfile} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container-myProfile">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.success:
        if (posts.length === 0) {
          return (
            <div className="noPostView">
              <BiCamera className="biCameraIcon" />
              <h1 className="noPostPara">No Posts</h1>
            </div>
          )
        }
        return (
          <>
            <div className="UserProfileContainer">
              <img
                src={myProfile.profile_pic}
                alt="my profile"
                className="userProfileImageBig"
              />
              <div className="user-profile-sub-container">
                <h1 className="userProfileUserName">{myProfile.user_name}</h1>
                <div className="user-profile-details">
                  <img
                    src={myProfile.profile_pic}
                    alt="user profile"
                    className="userProfileImageSmall"
                  />
                  <div className="span-para">
                    <div className="ZZ">
                      <span>{myProfile.posts_count}</span>
                      <p className="userProfileCommonPara">posts</p>
                    </div>
                    <div className="ZZ">
                      <span>{myProfile.followers_count}</span>
                      <p className="userProfileCommonPara">followers</p>
                    </div>
                    <div className="ZZ">
                      <span>{myProfile.following_count}</span>
                      <p className="userProfileCommonPara">following</p>
                    </div>
                  </div>
                </div>
                <p className="userProfileUser-id">{myProfile.user_id}</p>
                <p className="user-bio">{myProfile.user_bio}</p>
              </div>
            </div>
            <div className="story-container-new">
              <ul className="UserStoryImagesContainer">
                {stories.map(eachStory => (
                  <StoryMapper
                    key={eachStory.id}
                    detail={eachStory}
                    altVal="my story"
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
                <ul className="MyPostsItemContainer">
                  {posts.map(eachPost => (
                    <PostMapper
                      key={eachPost.id}
                      detail={eachPost}
                      altVal="my post"
                    />
                  ))}
                </ul>
              </div>
            )}
            {posts.length === 0 && this.NoPostView()}
          </>
        )
      case apiStatusConstants.failure:
        return <FailureView respectiveFunction={this.repeatAPICall} />
      default:
        return null
    }
  }

  render() {
    const {myProfile} = this.state
    console.log(myProfile)
    return (
      <div className="MyProfileContainer">
        <div className="ResponsiveContainer">{this.renderMyProfileViews()}</div>
      </div>
    )
  }
}
export default MyProfile
