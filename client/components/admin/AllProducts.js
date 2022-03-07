import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks, deleteBook } from '../../store/books';

class AllProducts extends React.Component {
	constructor(props) {
		super(props);
		this.removeBook = this.removeBook.bind(this);
	}

	componentDidMount() {
		this.props.loadBooks();
	}

	removeBook(bookId) {
		this.props.deleteBook(bookId);
	}

	render() {
		const { books } = this.props;
		const { removeBook } = this;

		if (!books || books.length === 0) {
			return (
				<div>
					<Link to="/books/add">
						<button className="add-book" type="button">
							Add New Book
						</button>
					</Link>
					<h3>No Books</h3>
				</div>
			);
		}

		return (
			<div className="admin-books">
				<Link to="/books/add">
					<button className="add-book" type="button">
						Add New Book
					</button>
				</Link>

				{books.map(book => (
					<div className="book-row" key={`book-${book.id}`}>
						<img src={book.imageURL} />
						<div className="book-info-row">
							<Link to={`/books/${book.id}`}>
								<h3>{book.name}</h3>
							</Link>
							<p>
								<b>Price: $</b>
								{book.price ? Number(book.price).toFixed(2) : ''}
							</p>
							<p>
								<b>Inventory: </b>
								{book.inventory}
							</p>
							<div>
								<Link to={`/books/${book.id}/edit`}>
									<button className="admin-buttons" type="button">
										Edit
									</button>
								</Link>

								<button
									className="admin-buttons"
									type="button"
									onClick={() => removeBook(book.id)}>
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = ({ books }) => {
	return { books };
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		loadBooks: () => dispatch(fetchBooks()),
		deleteBook: bookId => dispatch(deleteBook(bookId, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
