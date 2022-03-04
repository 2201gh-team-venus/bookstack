//this is the access point for all things database related!
const db = require('./db');

const Author = require('./models/Author');
const Book = require('./models/Book');
const CartItem = require('./models/CartItem');
const Comment = require('./models/Comment');
const Genre = require('./models/Genre');
const Cart = require('./models/Cart');
const User = require('./models/User');

// ASSOCIATIONS

// Book has authorID as FK
Author.hasMany(Book);
Book.belongsTo(Author);

// Comment has userID as FK
User.hasMany(Comment);
Comment.belongsTo(User);

// Comment has bookID as FK
Book.hasMany(Comment);
Comment.belongsTo(Book);

// Cart has userID as FK
User.hasMany(Cart);
Cart.belongsTo(User);

// book_genre has genreID and bookID as FK
Book.belongsToMany(Genre, { through: 'book_genre' });
Genre.belongsToMany(Book, { through: 'book_genre' });

// CartItem has bookID and cartID as FK
Book.belongsToMany(Cart, { through: CartItem, foreignKey: 'books_id' });
Cart.belongsToMany(Book, { through: CartItem, foreignKey: 'carts_id' });

module.exports = {
	db,
	models: {
		Author,
		Book,
		CartItem,
		Comment,
		Genre,
		Cart,
		User
	}
};
