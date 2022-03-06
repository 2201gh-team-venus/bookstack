import axios from 'axios';

const SET_SINGLE_BOOK = 'SET_SINGLE_BOOK';
const CREATE_COMMENT = 'CREATE_COMMENT';

const setSingleBook = book => {
	return {
		type: SET_SINGLE_BOOK,
		book
	};
};

const _createComment = comment => {
	return {
		type: CREATE_COMMENT,
		comment
	}
}

export const fetchSingleBook = bookId => {
	return async dispatch => {
		const { data: book } = await axios.get(`/api/books/${bookId}`);
		dispatch(setSingleBook(book));
	};
};

export const createComment = (comment, history) => {
	return async (dispatch) => {
		const { data: created } = await axios.post('/api/comments', comment);
		console.log('comment', comment)
		dispatch(_createComment(created));
		//don't think we need history.push because remain on single page
	}
}

export default function singleBookReducer(state = {}, action) {
	switch (action.type) {
		case SET_SINGLE_BOOK:
			return action.book;
		case CREATE_COMMENT:
			return action.comment; // is this right? {...state, action.comment}
		default:
			return state;
	}
}
