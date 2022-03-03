import axios from 'axios';

// ACTION TYPE
const SET_BOOKS = 'SET_BOOKS';

// ACTION CREATOR
const setBooks = books => {
	return {
		type: SET_BOOKS,
		books
	};
};

// THUNK CREATOR
export const fetchBooks = () => {
	return async dispatch => {
		const { data: books } = await axios.get('/api/books');
		dispatch(setBooks(books));
	};
};

// REDUCER
export default function booksReducer(state = [], action) {
	switch (action.type) {
		case SET_BOOKS:
			return action.books;
		default:
			return state;
	}
}
