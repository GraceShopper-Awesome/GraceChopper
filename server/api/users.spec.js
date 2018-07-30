/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
var session = require('supertest-session')
var testSession = null;


xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(function () {
    testSession = session(app);
    testSession.post('/signin').send({username:'admin@user.com', password: 'password'})
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        userType: 'admin'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
