const User = require('./user')
const Product = require('./product')
const Address = require('./address')
const Cart = require('./cart')
const Order = require('./order')
const Review = require('./review')
const cartProduct = require('./cartProduct')
const orderProduct = require('./orderProduct')

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasOne(Address)
Address.belongsTo(User)

Product.belongsToMany(Order, {through: orderProduct})
Order.belongsToMany(Product, {through: orderProduct})

Cart.belongsToMany(Product, {through: cartProduct})
Product.belongsToMany(Cart, {through: cartProduct})

User.hasOne(Cart)

module.exports = {
  User,
  Product,
  Address,
  Cart,
  Order,
  Review,
  cartProduct,
  orderProduct
}
