import axios from 'axios';

/* Action types. */
const ALL_BOOKS = 'ALL_BOOKS';
const CLEAR_BOOKS = 'CLEAR_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const EDIT_QUANTITY = 'EDIT_QUANTITY';

/* Action creators. */
const _allBooks = books => ({ type: ALL_BOOKS, books });
export const _clearBooks = () => ({ type: CLEAR_BOOKS });
const _addBook = book => ({ type: ADD_BOOK, book });
const _removeBook = book => ({ type: REMOVE_BOOK, book });
const _editQuantity = book => ({ type: EDIT_QUANTITY, book });

/* Thunk creators. */
export const allBooks = () => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data } = await axios.get(`api/carts/pending`, {
				headers: {
					authorization: token
				}
			});
			const books = data.cart_items.map(cart_item => {
				return cart_item.book;
			});
			const action = _allBooks(books);
			dispatch(action);
			return;
		} else {
			if (localStorage.getItem('temp')) {
				const books = JSON.parse(localStorage.getItem('temp'));
				const action = _allBooks(books);
				dispatch(action);
			}
		}
	};
};

export const addBook = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		console.log('token', token);
		if (token) {
			const { data } = await axios.post('api/carts/add/books', book, {
				headers: {
					authorization: token
				}
			});
			const action = _addBook(data);
			dispatch(action);
			return;
		} else {
			if (localStorage.getItem('temp')) {
				const books = JSON.parse(localStorage.getItem('temp'));
				const action = _addBook(books);
				dispatch(action);
			}
		}
	};
};

export const removeBook = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data } = await axios.put('api/carts/remove/books', book, {
				headers: {
					authorization: token
				}
			});
			const action = _removeBook(data);
			dispatch(action);
			return;
		} else {
			if (localStorage.getItem('temp')) {
				const book = JSON.parse(localStorage.getItem('temp'));
				const action = _removeBook(book);
				dispatch(action);
			}
		}
	};
};

export const editQuantity = book => {
	return async dispatch => {
		const token = window.localStorage.getItem('token');
		if (token) {
			const { data } = await axios.put(`api/carts/books/quantity`, book, {
				headers: {
					authorization: token
				}
			});
			const action = _editQuantity(data);
			dispatch(action);
			return;
		} else {
			if (localStorage.getItem('temp')) {
				const book = JSON.parse(localStorage.getItem('temp'));
				const action = _editQuantity(book);
				dispatch(action);
			}
		}
	};
};

const init = [];

function cartReducer(state = init, action) {
	switch (action.type) {
		case ALL_BOOKS:
			return [...action.books];
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
