import React from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/books';

class AllProducts extends React.Component {
	componentDidMount() {
		this.props.loadBooks();
	}

	render() {
		const { books } = this.props;
		if (!books || books.length === 0) {
			return (
				<div>
					<h3>No Books</h3>
				</div>
			);
		}

		return (
			<div className="admin-books">
				{books.map(book => (
					<div className="book-row" key={book.id}>
						<img src={book.imageURL} />
						<div className="book-info-row">
							<h3>{book.name}</h3>
							<p>
								<b>Price: $</b>
								{book.price}
							</p>
							<p>
								<b>Inventory: </b>
								{book.inventory}
							</p>
							<div>
								<button className="admin-buttons" type="button">Edit</button>
								<button className="admin-buttons" type="button">Remove</button>
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

const mapDispatchToProps = dispatch => {
	return {
		loadBooks: () => dispatch(fetchBooks())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
