import React from "react";
import { connect } from "react-redux";
import { fetchSingleBook } from "../store/singleBook";
import CommentList from "./CommentsList";

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
		const comments = this.props.book.comments || []; //check with Pamela for keys!!!
		console.log("this.props: --->", this.props);
		console.log("COMMENTS HERE!!!, SINGLEBOOK --->", comments);
		return (
			<div className="book">
				<img src={imageURL} />
				<div className="book-info">
					<h2>{name}</h2>
					<h4>By: {author.name}</h4>
					<p>{description}</p>
					<h2>${price}</h2>
					<button>Add To Cart</button>

					<div className="reviews">
						<h4>Reviews:</h4>
						<CommentList comments={comments} /> {/*check if this works!*/}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ book }) => {
	return { book };
};

const mapDispatchToProps = dispatch => {
	return {
		loadSingleBook: bookId => dispatch(fetchSingleBook(bookId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
