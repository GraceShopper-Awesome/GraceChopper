const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')

const Review = require('./review')
const OrderItem = require('./orderItem')

const ProductCategory = require('./productCategory')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Category.belongsToMany(Product, {through: 'productCategories'}) //Category.hasMany(Category)
Product.belongsToMany(Category, {through: 'productCategories'})

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)


OrderItem.belongsTo(Order)
OrderItem.belongsTo(Product)
Product.hasMany(OrderItem)
Order.hasMany(OrderItem)





User.hasMany(Review)
Review.belongsTo(User)



module.exports = {
  User,
  Category,
  Order,
  Product,
  Review,
  ProductCategory,
  OrderItem
}
