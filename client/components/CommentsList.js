import React from 'react';

const CommentsList = props => {
	const comments = props.comments || [];

	if (comments.length === 0) {
		return <p>Be the first to leave a comment!</p>;
	}
	
	return (
		<div>
			{comments.map(comment => (
				<div className="comment-row" key={comment.id}>
					<h4>{comment.user ? comment.user.username : ''}</h4>
					<p>{comment.message}</p>
					<h6>{comment.createdAt}</h6>
				</div>
			))}
		</div>
	);
};

export default CommentsList;
