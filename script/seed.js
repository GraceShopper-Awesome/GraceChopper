const db = require('../server/db')
const {
  User,
  Category,
  Product,
  Order,
  ProductCategory,
  Review,
  OrderItem
} = require('../server/db/models')

const productsArr = [
  {
    title: 'CH-47 Chinook',
    stock: 10,
    price: 35000000,
    description:
      'Twin-engine, tandem rotor, heavy-lift chopper for all of your troop transportation needs',
    imageUrl: [
      'https://amp.businessinsider.com/images/5aa18f0fe86053d64a8b4610-750-375.jpg'
    ]
  },
  {
    title: 'AVX Hypersonic',
    stock: 5,
    price: 10000000,
    description:
      'The future is now! Pre-order the revolutionary AVX Hypersonic helicopter and travel in style!',
    imageUrl: [
      'https://cnet3.cbsistatic.com/img/mZfxb97U76UxqDp8LrJDZEbWlPw=/970x0/2013/09/13/ee9083e4-5739-11e3-89ab-14feb5ca9861/AVX_Aircraft_JMR.jpg'
    ]
  },
  {
    title: 'Bumblebee Airbus',
    stock: 15,
    price: 500000,
    description: `"Float like a butterfly, sting like a bumblebee!" - Mohammed Ali`,
    imageUrl: [
      'https://www.airbushelicopters.ca/wp-content/uploads/babcock-fleet.jpg'
    ]
  },
  {
    title: 'Dragonfly',
    stock: 30,
    price: 10000,
    description:
      'The perfect personal helicopter for work commutes or budding helicopter hobbyists',
    imageUrl: [
      'https://ae01.alicdn.com/kf/HTB11xymj6ihSKJjy0Feq6zJtpXaD/SCHWEIZER-300C-Hughes-9CH-RC-Helicopter-Brushless-RTF-All-Metal-high-Simulation-Remote-Control-Helicopter-Static.jpg_640x640.jpg'
    ]
  },
  {
    title: 'Cropduster 5000',
    stock: 20,
    price: 50000,
    description:
      'Voted by JD Power and Associates as the best helicopter for spraying chemicals on your crops',
    imageUrl: [
      'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/09/z-10_helo_expo.jpg?itok=zrE_GgB6&fc=50,50'
    ]
  },
  {
    title: 'StrikeForce',
    stock: 35,
    price: 1000000,
    description:
      'Render your enemies helpless with the military grade StrikeForce helicopter model. Missiles sold separately!',
    imageUrl: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Apache_Helicopter_Firing_Rockets_MOD_45154922.jpg/1200px-Apache_Helicopter_Firing_Rockets_MOD_45154922.jpg'
    ]
  },
  {
    title: 'Mall Helicopter',
    stock: 50,
    price: 200,
    description: 'Perfect holiday gift for the future pilot',
    imageUrl: [
      'http://slotstock.co.uk/slotStock/main/skyhawk-childrens-ride.png'
    ]
  },
  {
    title: 'Chopper Jr',
    stock: 100,
    price: 500,
    description: 'The first trike for your little tyke!',
    imageUrl: [
      'https://st.hzcdn.com/simgs/c441740a05b9856e_4-4337/home-design.jpg'
    ]
  },
  {
    title: 'Road Rager XL',
    stock: 30,
    price: 1000,
    description:
      'Tear up the highway and with the Road Rager XL. Female not included.',
    imageUrl: ['https://i.ytimg.com/vi/ZectQMIQzNs/hqdefault.jpg']
  },
  {
    title: 'Red Hawk',
    stock: 15,
    price: 1200,
    description:
      'Guarenteed to get you at least one date while riding, or your money back!',
    imageUrl: [
      'https://qph.fs.quoracdn.net/main-qimg-7c3632e07599da47d73434f7db322e20-c'
    ]
  },
  {
    title: 'Gotham',
    stock: 22,
    price: 1400,
    description:
      'Feel like batman (Christian Bale... not Ben Affleck) with the limited edition Gotham chopper',
    imageUrl: [
      'http://www.custom-motorcycle-parts.com/wp-content/uploads/2010/05/gothic-custom-chopper_1.jpg'
    ]
  },
  {
    title: 'Ghost Rider 2.0',
    stock: 18,
    price: 2000,
    description: 'For Nicolas Cage enthusiasts',
    imageUrl: [
      'https://i.pinimg.com/originals/bc/e3/e7/bce3e7ff39ffd932e811e3eb7eba3d76.jpg'
    ]
  },
  {
    title: 'Helicycle',
    stock: 33,
    price: 1000,
    description:
      'Having trouble deciding between a motorcycle and helicopter? Then get yourself a vehicle that can do both - the Helicycle',
    imageUrl: [
      'https://www.visordown.com/sites/default/files/article-images/4/46860.jpg'
    ]
  },
  {
    title: 'Uncle Sam Special',
    stock: 50,
    price: 2500,
    description:
      'Show off your undying love for your country with the Uncle Sam Special',
    imageUrl: [
      'http://3.bp.blogspot.com/-RdnTPx-MdlU/TjoSS8Tnb3I/AAAAAAAAGVw/zPAls0YpTas/s1600/jb61.jpg'
    ]
  },
  {
    title: 'My First Harley',
    stock: 57,
    price: 199,
    description:
      'Show your kids you really love them with the "My First Harley"',
    imageUrl: [
      'http://blog.motorcycle.com.vsassets.com/wp-content/uploads/2008/12/0002708420873_500x500.jpg'
    ]
  },
  {
    title: 'Copper Chopper',
    stock: 30,
    price: 3000,
    description:
      'The refurbished Copper Chopper is perfect for riding to local donut shops',
    imageUrl: [
      'http://www.normandyparkblog.com/wp-content/images/NPPoliceMotorcycle.jpg'
    ]
  },
  {
    title: 'Recumbent Military Chopper',
    stock: 20,
    price: 10000,
    description: 'The best army in the world deserves a motorcycle',
    imageUrl: [
      'https://i.pinimg.com/originals/1b/9e/69/1b9e696f5c9627409338b5a0a41cd158.jpg'
    ]
  },
  {
    title: 'The Rouge One',
    stock: 25,
    price: 22000,
    description:
      'Feeling like going on a solo mission? See the stars in this beautiful red chopper',
    imageUrl: [
      'https://pdgfilmservices.com/wp-content/uploads/2017/07/Helicopter-rigged-with-GSS-C516-camera-system.jpg'
    ]
  },
  {
    title: 'Stinger 50-50',
    stock: 10,
    price: 18000,
    description:
      'Elegant, sleek, deceptive, enduring. The Stinger 50-50 is much more that so-so',
    imageUrl: [
      'https://nebula.wsimg.com/fe5f63e3a2accf4ca629430c6dc4bafd?AccessKeyId=70A8789C0A1AE299B517&disposition=0&alloworigin=1'
    ]
  }
]

const categoryArr = [
  {name: 'Helicopters'},
  {name: 'Motorcycles'},
  {name: 'Military Grade'},
  {name: 'Recreational Use'},
  {name: 'For Kids'}
]

const usersArr = [
  {
    userType: 'normal',
    email: 'HeathBeahan@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Olga74@hotmail.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Josiane13@gmail.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'ShanieBoehm32@hotmail.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Lilyan.Powlowski93@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'OrvalFritsch@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Orlo.Beatty64@hotmail.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Philip74@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Evalyn.Johnston26@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Penelope.Little76@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Seamus.Greenfelder@yahoo.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'ScarlettMosciski@hotmail.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'Deven.Gulgowski@gmail.com',
    password: 'password'
  },
  {
    userType: 'admin',
    email: 'admin@user.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'normalUser@user.com',
    password: 'password'
  },
  {
    userType: 'normal',
    email: 'cartUser@gmail.com',
    password: 'password'
  }
]

const orderArr = [
  {
    status: 'cancelled',
    userId: 3
  },
  {
    status: 'created',
    userId: 1
  },
  {
    status: 'processing',
    userId: 10
  },
  {
    status: 'completed',
    userId: 5
  },
  {
    status: 'created',
    userId: 9
  },
  {
    status: 'processing',
    userId: 3
  },
  {
    status: 'created',
    userId: 4
  },
  {
    status: 'processing',
    userId: 11
  },
  {
    status: 'completed',
    userId: 8
  },
  {
    status: 'cancelled',
    userId: 2
  }
]

const productCategoryArr = [
  {
    categoryId: 1,
    productId: 1
  },
  {
    categoryId: 3,
    productId: 1
  },
  {
    categoryId: 1,
    productId: 2
  },
  {
    categoryId: 3,
    productId: 2
  },
  {
    categoryId: 1,
    productId: 3
  },
  {
    categoryId: 3,
    productId: 3
  },
  {
    categoryId: 4,
    productId: 3
  },
  {
    categoryId: 1,
    productId: 4
  },
  {
    categoryId: 4,
    productId: 4
  },
  {
    categoryId: 1,
    productId: 5
  },
  {
    categoryId: 3,
    productId: 5
  },
  {
    categoryId: 4,
    productId: 5
  },
  {
    categoryId: 1,
    productId: 6
  },
  {
    categoryId: 3,
    productId: 6
  },
  {
    categoryId: 1,
    productId: 7
  },
  {
    categoryId: 5,
    productId: 7
  },
  {
    categoryId: 2,
    productId: 8
  },
  {
    categoryId: 5,
    productId: 8
  },
  {
    categoryId: 2,
    productId: 9
  },
  {
    categoryId: 4,
    productId: 9
  },
  {
    categoryId: 2,
    productId: 10
  },
  {
    categoryId: 4,
    productId: 10
  },
  {
    categoryId: 2,
    productId: 11
  },
  {
    categoryId: 4,
    productId: 11
  },
  {
    categoryId: 2,
    productId: 12
  },
  {
    categoryId: 4,
    productId: 12
  },
  {
    categoryId: 1,
    productId: 13
  },
  {
    categoryId: 2,
    productId: 13
  },
  {
    categoryId: 4,
    productId: 13
  },
  {
    categoryId: 2,
    productId: 14
  },
  {
    categoryId: 4,
    productId: 14
  },
  {
    categoryId: 2,
    productId: 15
  },
  {
    categoryId: 5,
    productId: 15
  },
  {
    categoryId: 2,
    productId: 16
  },
  {
    categoryId: 4,
    productId: 16
  },
  {
    categoryId: 2,
    productId: 17
  },
  {
    categoryId: 3,
    productId: 17
  },
  {
    categoryId: 1,
    productId: 18
  },
  {
    categoryId: 3,
    productId: 18
  },
  {
    categoryId: 1,
    productId: 19
  }
]

const seedProducts = async () => {
  try {
    for (let product of productsArr) {
      await Product.create(product)
    }
  } catch (err) {
    console.error(err)
  }
}

const seedCategories = async () => {
  try {
    for (let category of categoryArr) {
      await Category.create(category)
    }
  } catch (err) {
    console.error(err)
  }
}

const seedUsers = async () => {
  try {
    for (let user of usersArr) {
      await User.create(user)
    }
  } catch (err) {
    console.error(err)
  }
}

const seedOrders = async () => {
  try {
    for (let order of orderArr) {
      await Order.create(order)
    }
  } catch (err) {
    console.error(err)
  }
}

const seedCategoryAssociations = async () => {
  try {
    for (let catAssoc of productCategoryArr) {
      await ProductCategory.create(catAssoc)
    }
  } catch (err) {
    console.error(err)
  }
}

const seed = async () => {
  try {
    await db.sync({force: true})
    await seedProducts()
    await seedCategories()
    await seedUsers()
    await seedOrders()
    await seedCategoryAssociations()
    console.log('Seed successful')
    db.close()
  } catch (err) {
    console.error(err)
  }
}
seed()

module.exports = seed

// ORDERS
// status: cancelled
// userId: 3
// status: cart
// userId: 10
// status: processing
// userId: 8
// status: created
// userId: 1
// status: cart
// userId: 5
// status: cancelled
// userId: 8
// status: completed
// userId: 3
// status: cart
// userId: 1
// status: created
// userId: 6
// status: completed
// userId: 10
// status: processing
// userId: 2

// CATEGORIES //
// Helicopters
// Motorcycles
// Military Grade
// Recreational Use
// For Kids

// USERS
// HeathBeahan@yahoo.com
// Olga74@hotmail.com
// Josiane13@gmail.com
// ShanieBoehm32@hotmail.com
// Lilyan.Powlowski93@yahoo.com
// OrvalFritsch@yahoo.com
// Orlo.Beatty64@hotmail.com
// Evalyn.Johnston26@yahoo.com
// Philip74@yahoo.com
// Penelope.Little76@yahoo.com
// Seamus.Greenfelder@yahoo.com
// ScarlettMosciski@hotmail.com
// Deven.Gulgowski@gmail.com
// admin@user.com
// normalUser@user.com
// cartUser@gmail.com

// // Helicopters
// title: 'CH-47 Chinook',
// stock: 10,
// price: 35000000,
// description: 'Twin-engine, tandem rotor, heavy-lift chopper for all of your troop transportation needs',
// imageUrl: ['https://amp.businessinsider.com/images/5aa18f0fe86053d64a8b4610-750-375.jpg']

// title: 'AVX Hypersonic',
// stock: 5,
// price: 10000000,
// description: 'The future is now! Pre-order the revolutionary AVX Hypersonic helicopter and travel in style!',
// imageUrl: ['https://cnet3.cbsistatic.com/img/mZfxb97U76UxqDp8LrJDZEbWlPw=/970x0/2013/09/13/ee9083e4-5739-11e3-89ab-14feb5ca9861/AVX_Aircraft_JMR.jpg']

// title: 'Bumblebee Airbus',
// stock: 15,
// price: 500000,
// description: `"Float like a butterfly, sting like a bumblebee!" - Mohammed Ali`
// imageUrl: ['https://www.airbushelicopters.ca/wp-content/uploads/babcock-fleet.jpg']

// title: 'Dragonfly',
// stock: 30,
// price: 10000,
// description: 'The perfect personal helicopter for work commutes or budding helicopter hobbyists'
// imageUrl: ['https://ae01.alicdn.com/kf/HTB11xymj6ihSKJjy0Feq6zJtpXaD/SCHWEIZER-300C-Hughes-9CH-RC-Helicopter-Brushless-RTF-All-Metal-high-Simulation-Remote-Control-Helicopter-Static.jpg_640x640.jpg']

// title: 'Cropduster 5000',
// stock: 20,
// price: 50000,
// description: 'Voted by JD Power and Associates as the best helicopter for spraying chemicals on your crops',
// imageUrl: ['https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/09/z-10_helo_expo.jpg?itok=zrE_GgB6&fc=50,50']

// title: 'StrikeForce',
// stock: 35,
// price: 1000000,
// description: 'Render your enemies helpless with the military grade StrikeForce helicopter model. Missiles sold separately!'
// imageUrl: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Apache_Helicopter_Firing_Rockets_MOD_45154922.jpg/1200px-Apache_Helicopter_Firing_Rockets_MOD_45154922.jpg']

// title: 'Mall Helicopter',
// stock: 50,
// price: 200,
// description: 'Perfect holiday gift for the future pilot'
// imageUrl: ['http://slotstock.co.uk/slotStock/main/skyhawk-childrens-ride.png']

// // // Motorcycles
// title: 'Chopper Jr',
// stock: 100,
// price: 500,
// description: 'The first trike for your little tyke!',
// imageUrl: ['https://st.hzcdn.com/simgs/c441740a05b9856e_4-4337/home-design.jpg']

// title: 'Road Rager XL',
// stock: 30,
// price: 1000,
// description: 'Tear up the highway and with the Road Rager XL. Female not included.'
// imageUrl: ['https://i.ytimg.com/vi/ZectQMIQzNs/hqdefault.jpg']

// title: 'Red Hawk',
// stock: 15,
// price: 1200,
// description: 'Guarenteed to get you at least one date while riding, or your money back!'
// imageUrl: ['https://qph.fs.quoracdn.net/main-qimg-7c3632e07599da47d73434f7db322e20-c']

// title: 'Gotham',
// stock: 22,
// price: 1400,
// description: 'Feel like batman (Christian Bale... not Ben Affleck) with the limited edition Gotham chopper',
// imageUrl: ['http://www.custom-motorcycle-parts.com/wp-content/uploads/2010/05/gothic-custom-chopper_1.jpg']

// title: 'Ghost Rider 2.0',
// stock: 18,
// price: 2000,
// description: 'For Nicolas Cage enthusiasts'
// imageUrl: ['https://i.pinimg.com/originals/bc/e3/e7/bce3e7ff39ffd932e811e3eb7eba3d76.jpg']

// title: 'Helicycle',
// stock: 33,
// price: 1000,
// description: 'Having trouble deciding between a motorcycle and helicopter? Then get yourself a vehicle that can do both - the Helicycle'
// imageUrl: ['https://www.visordown.com/sites/default/files/article-images/4/46860.jpg']

// title: 'Uncle Same Special',
// stock: 50,
// price: 2500,
// description: 'Show off your undying love for your country with the Uncle Sam Special',
// imageUrl: ['http://3.bp.blogspot.com/-RdnTPx-MdlU/TjoSS8Tnb3I/AAAAAAAAGVw/zPAls0YpTas/s1600/jb61.jpg']

// title: 'My First Harley',
// stock: 57,
// price: 199,
// description: 'Show your kids you really love them with the "My First Harley"'
// imageUrl: ['http://blog.motorcycle.com.vsassets.com/wp-content/uploads/2008/12/0002708420873_500x500.jpg']

// title: 'Copper Chopper',
// stock: 30,
// price: 3000,
// description: 'The refurbished Copper Chopper is perfect for riding to local donut shops'
// imageUrl: ['http://www.normandyparkblog.com/wp-content/images/NPPoliceMotorcycle.jpg']
