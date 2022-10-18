import {Link} from 'react-router-dom'
import './index.css'

const Stories = props => {
  const {data} = props

  return (
    <li className="storyContainer">
      <img src={data.story_url} alt="user story" className="storiesImage" />
      <Link to={`/users/${data.user_id}`} className="lnk-items">
        <p className="usernameOfStories">{data.user_name}</p>
      </Link>
    </li>
  )
}
export default Stories
