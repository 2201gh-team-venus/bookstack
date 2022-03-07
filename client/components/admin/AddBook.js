import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewBook } from '../../store/books';

class AddBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageURL: '',
			description: '',
			price: 0,
			inventory: 0,
			authorName: '',
			authorBio: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.addBook({ ...this.state });
	}

	render() {
		const { name, imageURL, description, price, inventory, authorName, authorBio } =
			this.state;
		const { handleChange, handleSubmit } = this;

		return (
			<div>
				<form className="add-book-form">
					{/* JOE CR: Can we consider some creative iteration strategies for building this form? */}
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

					<label htmlFor="authorName">Author: </label>
					<input
						className="author-name"
						name="authorName"
						value={authorName}
						onChange={handleChange}
					/>

					<label htmlFor="authorBio">Author's Bio: </label>
					<textarea
						className="author-bio"
						name="authorBio"
						value={authorBio}
						onChange={handleChange}
					/>
				</form>

				<div>
					<button className="add-book-button" type="submit" onClick={handleSubmit}>
						Add Book
					</button>
					<Link to="/products">Cancel</Link>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		addBook: book => dispatch(addNewBook(book, history))
	};
};

export default connect(null, mapDispatchToProps)(AddBook);
