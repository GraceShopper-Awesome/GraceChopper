const {expect} = require('chai')
const db = require('../index')
const {Order, OrderItem, Product, User} = require('./index')
const Bluebird = require('bluebird')
const faker = require('faker')
// const Order = db.model('order')


describe.only('Order', function() {

  // clear the database before all tests
  before(() => {
    return db.sync({force: true})
  })

  // erase all tasks after each spec
  afterEach(() => {
    return db.sync({force: true})
  })

  // describe('Class methods', function () {
  //
  //   beforeEach(() => {
  //     return Bluebird.all([
  //       Task.create({ name: 't1', due: helper.dates.tomorrow() }),
  //       Task.create({ name: 't2', due: helper.dates.tomorrow(), complete: true }),
  //       Task.create({ name: 't3', due: helper.dates.yesterday() }),
  //       Task.create({ name: 't4', due: helper.dates.yesterday(), complete: true })
  //     ]);
  //   });
  //
  //   describe('clearCompleted', function () {
  //     it('removes all completed tasks from the database', function () {
  //       return Task.clearCompleted()
  //         .then(() => {
  //           return Task.findAll({ where: { complete: true } });
  //         })
  //         .then((completedTasks) => {
  //           expect(completedTasks.length).to.equal(0);
  //           return Task.findAll({ where: { complete: false } });
  //         })
  //         .then((incompleteTasks) => {
  //           expect(incompleteTasks.length).to.equal(2);
  //         });
  //     });
  //
  //   });

  describe('Instance methods', function() {


    describe('customAddProduct', function() {
      let orderItem;
      let product;
      let cartUser;
      let cart;

      beforeEach(async () => {
        //Create fully linked cart/ orders with User, product and orderItem associations for testing
         cartUser = await User.create({email: 'cartUser@gmail.com', password: 'pass', userType: 'normal'})
         cart = await Order.create({status: 'cart'})

        cartUser.setOrders(cart).then(() => {
        })

         product = await Product.create({
          title: 'product1', price: 69,
          stock: 12, description: faker.lorem.paragraph()
        })

        orderItem =  await cart.customAddProduct(product, 1)
      })


      it('should update quantity to equal amt ', function() {
        return cart.customAddProduct(product, 3)
          .then((orderItem) => {
            expect(orderItem.quantity).to.equal(3)

          })
      })


      it('should deleted an orderItem if amt is zero', function() {
        return cart.customAddProduct(product, 0)
          .then(async (orderItem) => {
            console.log('id' , orderItem.dataValues.id)
            const dbFindOrderItem = await OrderItem.findOne({where: {id : orderItem.dataValues.id}})
            expect(dbFindOrderItem.dataValues.quantity).to.equal(0)

          })
      })




    })


  })

})
