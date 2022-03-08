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
            console.log(cartItems);
            const action = _cartItems(cartItems.cart_items);
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
        if (token) {
            const { data: newBook } = await axios.post('/api/carts/add/books', book, {
                headers: {
                    authorization: token
                }
            });
            const action = _addBook(newBook);
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
            const { data: deletedBook } = await axios.put(
                '/api/carts/remove/books',
                book,
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            const action = _removeBook(deletedBook);
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

export const editQuantity = (book, quantity) => {
    return async dispatch => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const { data: updatedBook } = await axios.put(
                `/api/carts/books/quantity`,
                { book, quantity },
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            const action = _editQuantity(updatedBook);
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
