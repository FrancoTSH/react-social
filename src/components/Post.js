import Comments from 'components/Comments';
import { useAuth } from 'context/AuthContext';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deletePost } from 'services/Posts';

const Post = ({ caption, imageURL, userData, likes, postedAt, userLiked, postId }) => {
  const { currentUser } = useAuth();

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header-info">
          <div className="post__header-avatar">
            <Link to={`/${userData.username}`}>
              <img src={userData.userPhoto} alt="avatar" />
            </Link>
          </div>
          <div className="post__header-name">
            <Link to={`/${userData.username}`}>
              {userData.username}
            </Link>
          </div>
        </div>
        {(currentUser && currentUser.displayName === userData.username)
          && <div className="post__header-delete">
            <button type="button" className="btn-delete" aria-label="delete" onClick={async () => await deletePost(postId, imageURL)}>
              <AiOutlineDelete size={22} />
            </button>
          </div>
        }
      </div>
      <div className="post__image">
        <img src={imageURL} alt="postImage" />
      </div>
      <div className="post_bottom">
        <Comments caption={caption} likes={likes} timestamp={postedAt} userLiked={userLiked} user={userData.username} postId={postId} />
      </div>
    </div>
  )
}

export default Post
