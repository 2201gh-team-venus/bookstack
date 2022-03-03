const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
	message: {
		type: Sequelize.TEXT
	}
});

module.exports = Comment;
