const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  available: {
    type: Sequelize.BOOLEAN,
    default: true

  },
  imageUrl: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['http://www.konvertra.com/sites/default/files/default_images/default_product.jpg'],
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Product.prototype.isAvailable = function() {
  if (this.available && this.stock) {
    return true
  }
  return false

}

module.exports = Product
