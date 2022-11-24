import axios from 'axios';
import React, { useState } from 'react';


axios.defaults.baseURL = `http://localhost:800`;

const CommentFrom = ({articleName, onArticleUpadted}) => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const addComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: comment,
        });
        onArticleUpadted(response.data);
        setName('');
        setComment("");
    }
  return (
    <div id="add-comment-form">
        <h3>Add Comment</h3>
        <label htmlFor="name">
            Name:
            <input type="text" id="name"  value={name} onChange={ e => setName(e.target.value)}/>
        </label>
        <label htmlFor="text">
            Comment:
            <textarea id="comment" rows="4" value={comment} onChange={ e => setComment(e.target.value)}/>
        </label>
        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default CommentFrom;