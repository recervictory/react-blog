import React from 'react'

const CommentList = ({comments}) => {
  return (
    <>
    <h3>CommentList</h3>
    {comments.map((comment, index) => (
        <div className="comment" key={index + comment.postedBy}>
        <h4>{comment.postedBy}</h4>
        <p>{comment.text}</p>
        </div>
    ))}
    </>
  )
}

export default CommentList;