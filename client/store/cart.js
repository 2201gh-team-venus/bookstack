import axios from 'axios';

/* Action types. */
const CART_ITEMS = 'CART_ITEMS';
const CLEAR_BOOKS = 'CLEAR_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const EDIT_QUANTITY = 'EDIT_QUANTITY';

/* Action creators. */
const _cartItems = cartItems => ({ type: CART_ITEMS, cartItems });
export const _clearBooks = () => ({ type: CLEAR_BOOKS });
const _addBook = book => ({ type: ADD_BOOK, book });
const _removeBook = book => ({ type: REMOVE_BOOK, book });
const _editQuantity = book => ({ type: EDIT_QUANTITY, book });

/* Thunk creators. */
export const cartItems = () => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data: cartItems } = await axios.get('/api/carts/pending', {
				headers: {
					authorization: token
				}
			});
			const action = _cartItems(cartItems);
			dispatch(action);
		}
	};
};

export const addBook = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data: newBook } = await axios.post('/api/carts/add/books', book, {
				headers: {
					authorization: token
				},
			});
			const action = _addBook(newBook);
			dispatch(action);
		}
	};
};

export const removeBook = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data: deletedBook } = await axios.put('/api/carts/remove/books', book, {
				headers: {
					authorization: token
				}
			});
			const action = _removeBook(deletedBook);
			dispatch(action);
		}
	};
};

export const editQuantity = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data: updatedBook } = await axios.put(`/api/carts/books/quantity`, book, {
				headers: {
					authorization: token
				}
			});
			const action = _editQuantity(updatedBook);
			dispatch(action);
		}
	};
};

const init = [];

function cartReducer(state = init, action) {
	switch (action.type) {
		case CART_ITEMS:
			return [...action.cartItems];
		case CLEAR_BOOKS:
			return [];
		case ADD_BOOK:
			return [...state, action.book];
		case REMOVE_BOOK:
			return state.filter(book => book.id !== action.book.id);
		case EDIT_QUANTITY:
			return state.map(book => (book.id === action.book.id ? action.book : book));
		default:
			return state;
	}
}

export default cartReducer;
