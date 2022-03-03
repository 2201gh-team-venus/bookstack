import React from 'react';

const CommentsList = (props) =>  {

    const comments = props.comments 
    const user = comments.user

    return (
        <div>
            {comments.map((comment) => (
                <div className='comment-row' key={comment.id}>
                    <h4>{user.name}</h4>
                    <p>{comment.message}</p>
                    <h6>{comment.createdAt}</h6>
                </div>
            ))}
        </div>
    )
}

export default CommentsList