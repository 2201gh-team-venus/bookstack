import React from 'react';
import { connect } from 'react-redux';
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
        }
    }

    render() {
        const { name, imageURL, description, price, inventory } = this.state;

        return (
            <div className="add-book-form">
                <div>
                    <label htmlFor="bookName">Title: </label>
                    <input name="name" value={name} />

                    <label htmlFor="imageURL">Image URL: </label>
                    <input name="imageURL" value={imageURL} />

                    <label htmlFor="description">Description: </label>
                    <input name="description" value={description} />

                    <label htmlFor="price">Price: </label>
                    <input name="price" value={price} />

                    <label htmlFor="inventory">Inventory: </label>
                    <input name="inventory" value={inventory} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        addBook: (book) => dispatch(addNewBook(book, history))
    }
}

export default connect(null, mapDispatchToProps)(AddBook);
