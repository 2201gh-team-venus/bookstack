import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleBook } from '../store/singleBook';
import { addBookToCart } from '../store/cart';
import CommentList from './CommentsList';
import CommentForm from './CommentForm';

class SingleBook extends React.Component {
	constructor() {
		super();
		this.addToCart = this.addToCart.bind(this);
	}
	componentDidMount() {
		this.props.loadSingleBook(this.props.match.params.bookId);
	}

	addToCart() {
		/* If user is not logged in. */
		if (!this.props.isLoggedIn) {
			/* If localstorage variable exist. */
			if (localStorage.getItem('temp')) {
				const books = JSON.parse(localStorage.getItem('temp'));

				/* Checks if book already in cart. */
				const found = books.find(elm => {
					if (elm.id === this.props.book.id) return true;
					return false;
				});

				if (found === undefined) {
					/* If book not found in localstorage add it, with key quantity = 0. */
					const book = { ...this.props.book };
					book.quantity = 1;
					books.push(book);
				}

				/* Set the localstorage item to a string. */
				localStorage.setItem('temp', JSON.stringify(books));
			} else {
				/* If localstorage does not exist add it, with key quantity = 0. */
				const arr = [{ ...this.props.book, quantity: 1 }];
				localStorage.setItem('temp', JSON.stringify(arr));
			}
		} else {
			this.props.addBookToCart(this.props.book);
		}
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
					<button onClick={this.addToCart}>Add to Cart</button>

					<div className="reviews">
						<h4>Reviews:</h4>
						<CommentForm />
						<CommentList comments={comments} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		book: state.book,
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadSingleBook: bookId => dispatch(fetchSingleBook(bookId)),
		addBookToCart: book => dispatch(addBookToCart(book))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook);
