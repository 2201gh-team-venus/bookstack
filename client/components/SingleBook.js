import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleBook } from '../store/singleBook';
import CommentList from './CommentsList';
import CommentForm from './CommentForm'

class SingleBook extends React.Component {
	componentDidMount() {
		this.props.loadSingleBook(this.props.match.params.bookId);
	}

	render() {
		if (!this.props.book) {
			return <h1>No book found</h1>;
		}
    
		const { name, description, imageURL, price } = this.props.book;
		const author = this.props.book.author || {};
		const comments = this.props.book.comments || [];

		return (
			<div className="book">
				<img src={imageURL} />
				<div className="book-info">
					<h2>{name}</h2>
					<h4>By: {author.name}</h4>
					<p>{description}</p>
					<h2>${price ? Number(price).toFixed(2) : 0}</h2>
					<button>Add to Cart</button>

					<div className="reviews">
						<h4>Reviews:</h4>
						<CommentForm/>
						<CommentList comments={comments} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		book: state.book,
		isLoggedIn: !!state.auth.id,
		users: state.users //need cart to be have backend to have info in []
	}
};

const mapDispatchToProps = dispatch => {
	return {
		loadSingleBook: bookId => dispatch(fetchSingleBook(bookId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
