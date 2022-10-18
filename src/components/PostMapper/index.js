import './index.css'

const PostMapper = props => {
  const {detail, altVal} = props

  return (
    <li className="eachPost">
      <img src={detail.image} alt={altVal} className="postsImagePostMapper" />
    </li>
  )
}
export default PostMapper
