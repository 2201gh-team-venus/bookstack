import axios from 'axios';

// ACTION TYPE
const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
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

export const deleteBook = (bookId, history) => {
	return async dispatch => {
		const { data: deletedBook } = await axios.delete(`api/books/${bookId}`);
		dispatch(_deleteBook(deletedBook));
		// history.push('/products');
	};
};

// REDUCER
export default function booksReducer(state = [], action) {
	switch (action.type) {
		case SET_BOOKS:
			return action.books;
		case ADD_BOOK:
			return [...state, action.book];
		case DELETE_BOOK:
			return state.filter(book => book.id !== action.book.id);
		default:
			return state;
	}
}
