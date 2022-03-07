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

// CartItems has cart_id and book_id as FK
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Book, { foreignKey: 'book_id' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });


// SEQUELIZE HOOK
Book.beforeValidate(book => {
	if (!book.imageURL || book.imageURL === '') {
		book.imageURL =
			'https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg.webp';
	}
});

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
