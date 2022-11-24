import React from 'react'

const CommentList = ({comments}) => {
  return (
    <>
    <h3>CommentList</h3>
    {comments.map(comment => (
        <div className="comment" key={comment.text}>
        <h4>{comment.postedBy}</h4>
        <p>{comment.text}</p>
        </div>
    ))}
    </>
  )
}

export default CommentList;