import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSingleBook } from '../../store/singleBook';
import { updateBook, _clearBook } from '../../store/books';

class EditBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageURL: '',
			description: '',
			price: 0,
			inventory: 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getSingleBook(this.props.match.params.bookId);
		this.setState({
			name: this.props.book.name,
			imageURL: this.props.book.imageURL,
			description: this.props.book.description,
			price: this.props.book.price,
			inventory: this.props.book.inventory
		});
	}

	componentDidUpdate(prevProps) {
		const book = this.props.book;
		if (prevProps.book.id !== book.id) {
			this.setState({
				name: book.name,
				imageURL: book.imageURL,
				description: book.description,
				price: book.price,
				inventory: book.inventory
			});
		}
	}

	componentWillUnmount() {
		this.props.clearBook();
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateBook({ ...this.props.book, ...this.state });
	}

	render() {
		const { name, imageURL, description, price, inventory } = this.state;
		const { handleChange, handleSubmit } = this;

		return (
			<div>
				<form className="update-book-form">
					<label htmlFor="bookName">Title: </label>
					<input
						className="book-name"
						name="name"
						value={name}
						onChange={handleChange}
					/>

					<label htmlFor="imageURL">Image URL: </label>
					<input
						className="book-imageURL"
						name="imageURL"
						value={imageURL}
						onChange={handleChange}
					/>

					<label htmlFor="description">Description: </label>
					<textarea
						className="book-description"
						name="description"
						value={description}
						onChange={handleChange}
					/>

					<label htmlFor="price">Price: </label>
					<input
						className="book-price"
						name="price"
						value={price}
						onChange={handleChange}
					/>

					<label htmlFor="inventory">Inventory: </label>
					<input
						className="book-inventory"
						name="inventory"
						value={inventory}
						onChange={handleChange}
					/>
				</form>

				<div>
					<button
						className="update-book-button"
						type="submit"
						onClick={handleSubmit}>
						Save
					</button>
					<Link to="/products">Cancel</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ book }) => {
	return { book };
};

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		getSingleBook: bookId => dispatch(fetchSingleBook(bookId)),
		updateBook: book => dispatch(updateBook(book, history)),
		clearBook: () => dispatch(_clearBook())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
