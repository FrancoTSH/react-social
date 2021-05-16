import Button from 'components/Button';
import Comment from 'components/Comment';
import LikeButton from 'components/LikeButton';
import { useAuth } from 'context/AuthContext';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { addComment, getComments, getMoreComments, likePost, unlikePost } from 'services/Posts';

const validateComment = (comment) => {
  if (comment === '') return undefined;
}

const parseDate = (timestamp) => {
  return timestamp.toDate().toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "2-digit",
  })
}

const Comments = ({ caption, likes, timestamp, userLiked, user, postId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState({ data: [], hasComments: false, last: null })
  const [liked, setLiked] = useState(userLiked)

  useEffect(() => {
    getComments(postId).then(res => {
      setComments({ data: res.docs.reverse(), hasComments: res.nextEmpty, last: res.lastDoc })
    })

  }, [postId])

  const handleSubmit = async ({ comment }, { resetForm }) => {
    try {
      const res = await addComment(postId, comment, currentUser.displayName)
      setComments(prevComments => ({ ...prevComments, data: [...prevComments.data, { commentId: res.id, username: currentUser.displayName, text: comment }] }));
      resetForm({
        comment: ''
      })
    } catch (err) {
      alert(err)
    }
  }

  const likeAction = async () => {
    if (liked) {
      unlikePost(postId, currentUser.uid)
      setLiked(false)
      likes.length--;
    } else {
      likePost(postId, currentUser.uid);
      setLiked(true)
      likes.length++;
    }
  }

  const seeMore = () => {
    getMoreComments(postId, comments.last).then(res => {
      setComments(prev => ({ data: [...res.docs, ...prev.data], hasComments: res.nextEmpty, last: res.lastDoc }))
    })
  }

  return (
    <div className="comments">
      <div className="comments__top">
        {
          currentUser && <LikeButton userLiked={liked} action={likeAction} />
        }
        <div className="comments__like-info">
          <span className="like-number">{likes.length}</span> Me gusta
        </div>
      </div>
      <div className="comments__main">
        {
          caption && (<div className="comments__caption">
            <span className="comments__container-name">{user}</span>
            <p>{caption}</p>
          </div>)
        }
        <div className="comments__section">
          {
            !comments.hasComments && <div className="comments__section-more" onClick={() => seeMore()}>
              <span className="link">Ver más comentarios</span>
            </div>
          }
          {
            comments.data && comments.data.map(comment => (
              <Comment key={comment.commentId} user={comment.username} text={comment.text} />
            ))
          }
        </div>
      </div>
      <div className="comments__date">
        <time>{parseDate(timestamp)}</time>
      </div>
      {
        currentUser && <div className="comments__input">
          <Formik
            initialValues={{ comment: '' }}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {
              ({ isSubmitting }) => (
                <Form>
                  <div className="comments__input-group">
                    <Field name="comment" placeholder="Agrega un comentario..." validate={validateComment} type="text" />
                    <Button text="Publicar" disabled={isSubmitting}></Button>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      }
    </div>
  )
}

export default Comments
