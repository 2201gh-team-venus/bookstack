import axios from 'axios';

// ACTION TYPE
const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';

// ACTION CREATOR
const setBooks = books => {
	return {
		type: SET_BOOKS,
		books
	};
};

const addBook = book => {
	return {
		type: ADD_BOOK,
		book
	};
};

// THUNK CREATOR
export const fetchBooks = () => {
	return async dispatch => {
		const { data: books } = await axios.get('/api/books');
		dispatch(setBooks(books));
	};
};

export const addNewBook = (book, history) => {
	return async dispatch => {
		const { data: newBook } = await axiox.post('/api/books', book);
		dispatch(addBook(newBook));
		history.push('/products');
	};
};

// REDUCER
export default function booksReducer(state = [], action) {
	switch (action.type) {
		case SET_BOOKS:
			return action.books;
		case ADD_BOOK:
			return [...state, action.book];
		default:
			return state;
	}
}
