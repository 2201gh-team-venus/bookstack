import axios from 'axios';

// ACTION TYPE
const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const CLEAR_BOOK  = 'CLEAR_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

// ACTION CREATOR
const _setBooks = books => {
	return {
		type: SET_BOOKS,
		books
	};
};

const _addBook = book => {
	return {
		type: ADD_BOOK,
		book
	};
};

const _updateBook = book => {
	return {
		type: UPDATE_BOOK,
		book
	};
};

export const _clearBook = book => {
	return {
		type: CLEAR_BOOK,
		book
	}
}

const _deleteBook = book => {
	return {
		type: DELETE_BOOK,
		book
	};
};

// THUNK CREATOR
export const fetchBooks = () => {
	return async dispatch => {
		const { data: books } = await axios.get('/api/books');
		dispatch(_setBooks(books));
	};
};

export const addNewBook = (book, history) => {
	return async dispatch => {
		const { data: newBook } = await axios.post('/api/books', book);
		dispatch(_addBook(newBook));
		history.push('/products');
	};
};

export const updateBook = (book, history) => {
	return async dispatch => {
		const { data: updatedBook } = await axios.put(`/api/books/${book.id}`, book);
		dispatch(_updateBook(updatedBook));
		history.push('/products');
	};
};

export const deleteBook = bookId => {
	return async dispatch => {
		const { data: deletedBook } = await axios.delete(`api/books/${bookId}`);
		dispatch(_deleteBook(deletedBook));
	};
};

// REDUCER
export default function booksReducer(state = [], action) {
	switch (action.type) {
		case SET_BOOKS:
			return action.books;
		case ADD_BOOK:
			return [...state, action.book];
		case UPDATE_BOOK:
			return state.map(book => (book.id === action.book.id ? action.book : book));
		case CLEAR_BOOK:
			return [];
		case DELETE_BOOK:
			return state.filter(book => book.id !== action.book.id);
		default:
			return state;
	}
}
