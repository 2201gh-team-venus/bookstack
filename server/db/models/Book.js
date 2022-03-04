const Sequelize = require('sequelize');
const db = require('../db');

const Book = db.define('book', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imageURL: {
		type: Sequelize.STRING,
		default:
			'https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg.webp'
	},
	description: {
		type: Sequelize.TEXT
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0
		}
	},
	price: {
		type: Sequelize.DECIMAL,
		allowNull: false
	}
});

module.exports = Book;
