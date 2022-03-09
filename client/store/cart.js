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
const _removeBook = bookId => ({ type: REMOVE_BOOK, bookId });
const _editQuantity = cartItem => ({ type: EDIT_QUANTITY, cartItem });

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
            const action = _cartItems(cartItems.cart_items);
			console.log(cartItems.cart_items);
            dispatch(action);
            return;
        } else {
            if (localStorage.getItem('temp')) {
                const books = JSON.parse(localStorage.getItem('temp'));
				const newCartItems = books.map(book => {
					return {
						book,
						book_id: book.id,
						quantity: 1
					}
				});
                const action = _cartItems(newCartItems);
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
            await axios.delete(
                `/api/carts/remove/books/${book.id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            const action = _removeBook(book.id);
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
            const { data: updatedCartItem } = await axios.put(
                `/api/carts/books/quantity`,
                { book, quantity },
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            const action = _editQuantity(updatedCartItem);
            dispatch(action);
            return;
        } else {
            if (localStorage.getItem('temp')) {
                const books = JSON.parse(localStorage.getItem('temp'));
				console.log('BOOK', book);
				const updatedBook = {
					book,
					book_id: book.id,
					quantity: quantity
				}
                const action = _editQuantity(updatedBook);
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
            return state.filter(book => book.id !== action.bookId);
        case EDIT_QUANTITY:
            return state.map(cartItem => (
				cartItem.book_id === action.cartItem.book_id ? action.cartItem : cartItem
			));
        default:
            return state;
    }
}

export default cartReducer;
