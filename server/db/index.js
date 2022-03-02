//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Author = require('./models/Author')
const Book = require('./models/Book')
const CartItem = require('./models/CartItem')
const Genre = require('./models/Genre')
const Order = require('./models/Order')
const ShoppingSession = require('./models/ShoppingSession')

//associations could go here!
Author.hasMany(Book)
Book.belongsTo(Author)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(CartItem)
CartItem.belongsTo(Order)

User.hasMany(ShoppingSession)
ShoppingSession.belongsTo(User)

Book.belongsToMany(Genre, { through: 'book_genre' })
Genre.belongsToMany(Book, { through: 'book_genre' })

Book.belongsToMany(User, { through: 'book_user' })
User.belongsToMany(Book, { through: 'book_user' })

module.exports = {
  db,
  models: {
    User,
    Author,
    Book,
    CartItem,
    Genre,
    Order,
    ShoppingSession
  },
}
