//this is the access point for all things database related!

const db = require('./db');

const Author = require('./models/Author');
const Book = require('./models/Book');
const CartItem = require('./models/CartItem');
const Comment = require('./models/Comment');
const Genre = require('./models/Genre');
const Cart = require('./models/Cart');
const User = require('./models/User');

//associations could go here!

// Book has authorID as FK
Author.hasMany(Book);
Book.belongsTo(Author);

// Comment has userID as FK
User.hasMany(Comment);
Comment.belongsTo(User);

// Comment has bookID as FK
Book.hasMany(Comment);
Comment.belongsTo(Book);

// CartItem has cartID as FK
// Cart.hasMany(CartItem);
// CartItem.belongsTo(Cart);

// Cart has userID as FK
User.hasMany(Cart);
Cart.belongsTo(User);

// Cart has CartItem as FK
CartItem.hasMany(Cart);
Cart.belongsTo(CartItem);

// CartItem has bookID as FK
Book.hasMany(CartItem);
CartItem.belongsTo(Book);

Book.belongsToMany(Genre, { through: 'book_genre' });
Genre.belongsToMany(Book, { through: 'book_genre' });

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
