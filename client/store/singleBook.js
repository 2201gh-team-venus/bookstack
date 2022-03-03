import axios from 'axios';

const SET_SINGLE_BOOK = 'SET_SINGLE_BOOK';

const setSingleBook = book => {
	return {
		type: SET_SINGLE_BOOK,
		book
	};
};

export const fetchSingleBook = bookId => {
	return async dispatch => {
		const { data: book } = await axios.get(`/api/books/${bookId}`);
		dispatch(setSingleBook(book));
	};
};

export default function singleBookReducer(state = {}, action) {
	switch (action.type) {
		case SET_SINGLE_BOOK:
			return action.book;
		default:
			return state;
	}
}
