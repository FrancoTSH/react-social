import Post from 'components/Post'
import { useAuth } from 'context/AuthContext'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { getPosts } from 'services/Posts'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = getPosts((snapshot) => {
      const allPosts = snapshot.docs.map(doc => ({
        ...doc.data(),
        postId: doc.id
      }))
      if (!snapshot.metadata.hasPendingWrites) {
        if (currentUser) {
          setPosts(allPosts.map((post) => {
            let userLiked = (post.likes.includes(currentUser.uid));
            return { ...post, userLiked };
          }))
        } else {
          setPosts(allPosts);
        }
      }
    })
    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="feed">
      <div className="feed__posts">
        {
          !posts ?
            <Skeleton count={4} height={460} width={400} />
            : posts.map(post => (
              <Post key={post.postId} {...post} />
            ))
        }
      </div>
    </div>
  )
}

export default Feed
