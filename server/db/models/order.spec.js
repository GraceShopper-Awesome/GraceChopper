const {expect} = require('chai')
const db = require('../index')
const {Order, OrderItem, Product, User} = require('./index')
const Bluebird = require('bluebird')
const faker = require('faker')
// const Order = db.model('order')

describe('Order', function() {
  // clear the database before all tests
  before(() => {
    return db.sync({force: true})
  })

  // erase all tasks after each spec
  afterEach(() => {
    return db.sync({force: true})
  })

  //   describe('Instance methods', function() {
  describe('Instance methods', function() {
    describe('customAddProduct', function() {
      let orderItem
      let product
      let cartUser
      let cart

      beforeEach(async () => {
        try {
          //Create fully linked cart/ orders with User, product and orderItem associations for testing
          cartUser = await User.create({
            email: 'cartUser@gmail.com',
            password: 'pass',
            userType: 'normal'
          })
          cart = await Order.create({status: 'cart'})

          cartUser.setOrders(cart).then(() => {})

          product = await Product.create({
            title: 'product1',
            price: 69,
            stock: 12,
            description: faker.lorem.paragraph()
          })

          orderItem = await cart.customAddProduct(product, 1)
        } catch (err) {
          console.error(err)
        }
      })

      it('should update quantity to equal amt ', function() {
        return cart.customAddProduct(product, 3).then(orderItem => {
          expect(orderItem.quantity).to.equal(3)
        })
      })

      it('should deleted an orderItem if amt is zero', function() {
        return cart.customAddProduct(product, 0).then(async orderItem => {
          try {
            const dbFindOrderItem = await OrderItem.findOne({
              where: {id: orderItem.dataValues.id}
            })
            expect(dbFindOrderItem.dataValues.quantity).to.equal(0)
          } catch (err) {
            console.error(err)
          }
        })
      })
    })
  })
})
