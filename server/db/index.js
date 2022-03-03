//this is the access point for all things database related!

const db = require('./db');

const Author = require('./models/Author');
const Book = require('./models/Book');
const CartItem = require('./models/CartItem');
const Comment = require('./models/Comment');
const Genre = require('./models/Genre');
const Order = require('./models/Order');
const ShoppingSession = require('./models/ShoppingSession');
const User = require('./models/User');

//associations could go here!
Author.hasMany(Book);
Book.belongsTo(Author);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(CartItem);
CartItem.belongsTo(Order);

User.hasMany(ShoppingSession);
ShoppingSession.belongsTo(User);

Book.hasMany(Comment);
Comment.belongsTo(Book);

Book.belongsToMany(Genre, { through: 'book_genre' });
Genre.belongsToMany(Book, { through: 'book_genre' });

Book.belongsToMany(User, { through: 'book_user' });
User.belongsToMany(Book, { through: 'book_user' });

module.exports = {
	db,
	models: {
		Author,
		Book,
		CartItem,
		Comment,
		Genre,
		Order,
		ShoppingSession,
		User
	}
};
