import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

class PostItems extends Component {
  state = {isLiked: false, likes: 0}

  componentDidMount() {
    const {detail} = this.props

    this.setState({likes: detail.likes_count})
  }

  mapComment = commentsArr =>
    commentsArr.map(el => (
      <p key={el.user_id} className="comments">
        <Link to={`/users/${el.user_id}`} className="link-items">
          <span className="user-id">{`${el.user_id} `}</span>
        </Link>
        {el.comment}
      </p>
    ))

  likeApiCall = async () => {
    const {detail} = this.props
    const postId = detail.post_id
    console.log(postId)
    const request = {
      like_status: true,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    }
    const response = await fetch(url, options)
    const jsonResponse = await response.json()
    if (response.ok) {
      this.setState(prev => ({likes: prev.likes + 1, isLiked: true}))
      console.log(jsonResponse)
    }
  }

  unLikeApiCall = async () => {
    const {detail} = this.props
    const postId = detail.post_id
    console.log(postId)
    const request = {
      like_status: false,
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(request),
    }
    const response = await fetch(url, options)
    const jsonResponse = await response.json()
    if (response.ok) {
      console.log(jsonResponse)
      this.setState(prev => ({likes: prev.likes - 1, isLiked: false}))
    }
  }
  //  testid="likeIcon"  testid="unLikeIcon"

  render() {
    const {detail} = this.props
    const {isLiked, likes} = this.state

    return (
      <li className="eachPostItemContainer">
        <div className="postAuthorAndName">
          <img
            src={detail.profile_pic}
            alt="post author profile"
            className="profileImage"
          />
          <Link to={`/users/${detail.user_id}`} className="link-items">
            <p className="postCreatorName">{detail.user_name}</p>
          </Link>
        </div>
        <img
          src={detail.post_details.image_url}
          alt="post"
          className="postsImage"
        />
        <div className="FeaturesContainer">
          <div className="iconsContainer">
            {!isLiked && (
              <button
                type="button"
                onClick={this.likeApiCall}
                className="special-button"
              >
                <BsHeart className="iconsBsHeart" />
              </button>
            )}
            {isLiked && (
              <button
                type="button"
                onClick={this.unLikeApiCall}
                className="special-button"
              >
                <FcLike className="iconsFsLike" />
              </button>
            )}
            <FaRegComment className="icons" /> <BiShareAlt className="icons" />
          </div>
          <p className="likes">{likes} likes</p>
          <p className="caption">{detail.post_details.caption}</p>
          {this.mapComment(detail.comments)}
          <p className="postedAt">{detail.created_at}</p>
        </div>
      </li>
    )
  }
}
export default PostItems
