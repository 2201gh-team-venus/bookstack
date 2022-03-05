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
			inventory: 0
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
        console.log(this.state);
        // this.props.addBook({ ...this.state });
	}

	render() {
		const { name, imageURL, description, price, inventory } = this.state;
        const { handleChange, handleSubmit } = this;

		return (
			<form className="add-book-form" onSubmit={handleSubmit}>
				<label htmlFor="bookName">Title: </label>
				<input name="name" value={name} onChange={handleChange} />

				<label htmlFor="imageURL">Image URL: </label>
				<input name="imageURL" value={imageURL} onChange={handleChange} />

				<label htmlFor="description">Description: </label>
				<input name="description" value={description} onChange={handleChange} />

				<label htmlFor="price">Price: </label>
				<input name="price" value={price} onChange={handleChange} />

				<label htmlFor="inventory">Inventory: </label>
				<input name="inventory" value={inventory} onChange={handleChange} />

				<div>
					<button type="submit">Add Book</button>
					<Link to="/products">Cancel</Link>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = (dispatch, { history }) => {
	return {
		addBook: book => dispatch(addNewBook(book, history))
	};
};

export default connect(null, mapDispatchToProps)(AddBook);
