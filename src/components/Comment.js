import React from 'react'

const Comment = ({ user, text }) => {
  return (
    <div className="comments__container">
      <div className="comments__container-name">{user}</div>
      <div className="comments__container-msg">{text}</div>
    </div>
  )
}

export default Comment
