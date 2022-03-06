import axios from 'axios';

/* Action types. */
const ALL_BOOKS = 'ALL_BOOKS';
const CLEAR_BOOKS = 'CLEAR_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

/* Action creators. */
const _allBooks = books => ({ type: ALL_BOOKS, books });
export const _clearBooks = () => ({ type: CLEAR_BOOKS });
const _addBook = obj => ({ type: ADD_BOOK, book: obj });
const _removeBook = obj => ({ type: REMOVE_BOOK, book: obj });
const _incQnt = obj => ({ type: INCREASE_QUANTITY, book: obj });
const _decQnt = obj => ({ type: DECREASE_QUANTITY, book: obj });

/* Thunk creators. */
export const allBooks = userId => {
	return async dispatch => {
		const { data } = await axios.get(`api/users/${userId}/carts/pending`);
		const action = _allBooks(data);
		dispatch(action);
	};
};

export const addBook = book => {
	return async dispatch => {
		const { data } = await axios.put(`api/`, book);
		const action = _addBook(data);
		dispatch(action);
	};
};

export const removeBook = book => {
	return async dispatch => {
		const { data } = await axios.put(`api/`, book);
		const action = _removeBook(data);
		dispatch(action);
	};
};

export const incQnt = book => {
	return async dispatch => {
		const { data } = await axios.put(`api/`, book);
		const action = _incQnt(data);
		dispatch(action);
	};
};

export const decQnt = book => {
	return async dispatch => {
		const { data } = await axios.put(`api/`, book);
		const action = _decQnt(data);
		dispatch(action);
	};
};

const init = [];

function cartReducer(state = init, action) {
	switch (action.type) {
		case ALL_BOOKS:
			return action.books ? [...action.books.books] : [];
		case CLEAR_BOOKS:
			return [];
		default:
			return state;
	}
}

export default cartReducer;
