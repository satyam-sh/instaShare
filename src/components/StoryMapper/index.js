import './index.css'

const StoryMapper = props => {
  const {detail, altVal} = props

  return (
    <li className="eachStoryItem">
      <img src={detail.image} alt={altVal} className="myProfileStoriesImage" />
    </li>
  )
}
export default StoryMapper
