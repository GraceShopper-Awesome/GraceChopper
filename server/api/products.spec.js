/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/allproducts', () => {
    const deskTitle = 'Desk'
    const deskPrice = '50'
    const deskStock = 10
    const deskDescription = 'A fine desk'
    const deskImageUrl = [
      'http://www.babinioffice.com/img/cms/205993946goggledesk-babinioffice-16.jpg'
    ]

    beforeEach(() => {
      return Product.create({
        title: deskTitle,
        price: deskPrice,
        stock: deskStock,
        description: deskDescription,
        imageUrl: deskImageUrl
      })
    })

    it('GET /api/products/allproducts', async () => {
      const res = await request(app)
        .get('/api/products/allproducts')
        .expect(200)

      expect(res.body[0].title).to.be.equal(deskTitle)
      expect(res.body[0].price).to.be.equal(deskPrice)
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
