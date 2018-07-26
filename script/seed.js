'use strict'
var faker = require('faker')
const Sequelize = require('sequelize')

const REVIEW_AMT = 1200
const USER_AMT = 25
const CATEGORY_AMT = 7
const PRODUCT_AMT = 150
const ORDER_AMT = 22
let ORDERITEM_AMT = PRODUCT_AMT


const db = require('../server/db')
const {User, Category, Product, Order, OrderItem, Review} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!


  //users
  let userArr = []
  let userTypes = ['admin', 'normal', 'guest']
  for (let i = 0; i < USER_AMT; i++) {
    let userT = userTypes[Math.floor(Math.random() * 3)]
    let email = faker.internet.email()
    email = email.replace('_', '')
    userArr.push({email: email, password: faker.internet.password(), userType: userT})
  }
  userArr.push({email: "admin@user.com" , password: 'password', userType: 'admin'})
  userArr.push({email: "normalUser@user.com" , password: 'password', userType: 'normal'})


  //categories
  let catArr = []
  for (let i = 0; i < CATEGORY_AMT; i++) {
    catArr.push({name: faker.commerce.department()})
  }


  //products
  let prodArr = []
  //title, price, stock, descriptio, image
  for (let i = 0; i < PRODUCT_AMT; i++) {
    prodArr.push({
      title: faker.commerce.productName(), price: faker.commerce.price(),
      stock: Math.ceil(Math.random() * 20), description: faker.lorem.paragraph()
    })

  }


  //order
  let orderArr = []
  let orderStatuses = ['completed', 'cancelled' , 'created' ,'processing']
  for (let i = 0; i < ORDER_AMT; i++) {
    orderArr.push({status: orderStatuses[Math.floor(Math.random() * 4)]})

  }


  //orderItem
  let orderItemArr = []

  for (let i = 0; i < ORDERITEM_AMT; i++) {
    orderItemArr.push({fixed_price: Math.random() * 2000})

  }


  //review
  let reviewArr = []

  for (let i = 0; i < REVIEW_AMT; i++) {
    reviewArr.push({content: faker.lorem.paragraph()})

  }

  const catData = await Category.bulkCreate(catArr)
  const orderData = await Order.bulkCreate(orderArr)
  const reviewData = await Review.bulkCreate(reviewArr)
  const orderItemData = await OrderItem.bulkCreate(orderItemArr)
  // const userData = await User.bulkCreate(userArr)
  // const prodData = await Product.bulkCreate(prodArr)






  //User assocs
  await Promise.all(userArr.map(async (user) => {

      let createdUser = await User.create(user)
      let orderArr = []
      let indArr = []

      for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
        let rand = Math.ceil(Math.random() * ORDER_AMT)

        if (!indArr.includes(rand)) {
          let order = await Order.findById(rand)
          orderArr.push(order)
        }

        indArr.push(rand)

      }


      createdUser.setOrders(orderArr).then((res) => {
      })


      let reviewArr = []
      indArr = []

      for (let i = 0; i < Math.ceil(Math.random() * 800); i++) {
        let rand = Math.ceil(Math.random() * REVIEW_AMT)

        if (!indArr.includes(rand)) {
          let review = await Review.findById(rand)
          reviewArr.push(review)
        }
      }

      createdUser.setReviews(reviewArr).then(() => {
      })

      return createdUser


    }
  ))




  //create product assoc
  await Promise.all(prodArr.map(async (prod) => {

    //many to many category
    let createdProd = await Product.create(prod)
    let catArr = []
    let indArr = []

    for (let i = 0; i < Math.ceil(Math.random() * 6); i++) {
      let rand = Math.ceil(Math.random() * 7)

      if (!indArr.includes(rand)) {
        let cat = await Category.findById(rand)
        catArr.push(cat)
      }

      indArr.push(rand)

    }




    indArr = []
    let revArr = []

    for (let i = 0; i < Math.ceil(Math.random() * 10000); i++) {
      let rand = Math.ceil(Math.random() * REVIEW_AMT)

      if (!indArr.includes(rand)) {
        let rev = await Review.findById(rand)
        revArr.push(rev)
      }

      indArr.push(rand)

    }


    createdProd.setCategories(catArr).then((res) => {
    })

    return createdProd.setReviews(revArr).then((res) => {
      Review.destroy({where: {userId: null}})
      Review.destroy({where: {productId: null}})
    })


  }))


//association random creation
//


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded  users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
