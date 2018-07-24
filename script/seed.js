'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

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
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userType: 'normal'}),
    User.create({email: 'murphy@email.com', password: '123', userType: 'normal'}),
    User.create({email: 'brad@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'bradley@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'zohaib@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'kevin@email.com', password: '123', userType: 'admin'}),
    User.create({email: 'caitlin@email.com', userType: 'guest'}),
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({title: 'nice helicopter', price: 1, stock: 22, description: 'a nice helicopter', imageUrl: ''}),
    Product.create({title: 'Smoke Chopper', price: 3000, stock: 5, description: 'barely street legal', imageUrl: 'https://cdn.shopify.com/s/files/1/2596/9148/products/BK7_1024x1024__21791.1503864601.1280.1280_2048x2048.jpg?v=1514845229'}),
    Product.create({title: 'The Americano', price: 89000.99, stock: 12, description: 'This cup of sweet American chopper is designed to get your from point a to point b in record time. If you wake up to a sweet cup of joe in the morning, kick your day up a notch with The Americano Chopper, designed to perk you up and get you out there.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgqxG7OrycnsLzC7z-7teE44UgAUop96T69UwYWgx1DwAWl__0g'}),
  ])
  console.log(`seeded ${products.length} products`)


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
