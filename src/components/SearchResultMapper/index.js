import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

class SearchResultMapper extends Component {
  state = {isLiked: false, likes: 0}

  componentDidMount() {
    const {detail} = this.props

    this.setState({likes: detail.likes_count})
  }

  mapComments = el => (
    <li key={el.user_id} className="eachComment">
      <p className="weak">
        <Link to={`/users/${el.user_id}`} className="link-items-search">
          <span className="strong">{el.user_name}</span>
        </Link>
        {el.comment}
      </p>
    </li>
  )

  likePostApi = async () => {
    const {detail} = this.props
    const postId = detail.post_id
    const request = {
      like_status: true,
    }
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    }
    const response = await fetch(url, options)
    const jsonResp = await response.json()
    if (response.ok) {
      this.setState(prev => ({isLiked: true, likes: prev.likes + 1}))
    }
  }

  UnLikePostApi = async () => {
    const {detail} = this.props
    const postId = detail.post_id
    const request = {
      like_status: false,
    }
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    }
    const response = await fetch(url, options)
    const jsonResp = await response.json()
    if (response.ok) {
      this.setState(prev => ({isLiked: false, likes: prev.likes - 1}))
    }
  }
  //  testid="likeIcon" testid="unlikeIcon"

  render() {
    const {isLiked, likes} = this.state
    const {detail} = this.props

    const {comments} = detail
    const postDetails = detail.post_details

    return (
      <li className="search-results-list">
        <div className="post-by-details">
          <img
            src={detail.profile_pic}
            alt="post author profile"
            className="profile-pics"
          />
          <Link to={`/users/${detail.user_id}`} className="link-items-search">
            <p className="user-name-of">{detail.user_name}</p>
          </Link>
        </div>
        <img src={postDetails.image_url} alt="post" className="post-pics" />
        <div className="searchPostDetails">
          <div className="icon-container">
            {!isLiked && (
              <button type="button" onClick={this.likePostApi}>
                <BsHeart className="eachIcons bsHeart" />
              </button>
            )}
            {isLiked && (
              <button type="button" onClick={this.UnLikePostApi}>
                <FcLike className="eachIcons fcLike" />
              </button>
            )}
            <FaRegComment className="eachIcons" />
            <BiShareAlt className="eachIcons" />
          </div>
          <p className="likes-of">{likes} likes</p>
          <p className="caption-of">{postDetails.caption}</p>
          <ul className="commentsList">
            {comments.map(el => this.mapComments(el))}
          </ul>
          <p className="created-at">{detail.created_at}</p>
        </div>
      </li>
    )
  }
}
export default SearchResultMapper
