import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../store/books';
import { cartItems } from '../store/cart';

export class AllBooks extends React.Component {
	componentDidMount() {
		this.props.loadBooks();
		this.props.cartItems();
	}
	render() {
		if (!this.props.books || this.props.books.length === 0) {
			return <h1>No Books!</h1>;
		}

		return (
			<div>
				<h1>All Books</h1>
				<div className="books">
					{this.props.books.map(book => (
						<div className="single-book" key={book.id}>
							<img src={book.imageURL} />
							<Link to={`/books/${book.id}`}>
								<h3>{book.name}</h3>
							</Link>
							<h4>{book.author.name}</h4>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		books: state.books,
		cart: state.cart
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadBooks: () => dispatch(fetchBooks()),
		cartItems: () => dispatch(cartItems())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
