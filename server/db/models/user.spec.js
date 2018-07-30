/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Sequelize = require("sequelize")

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return db.sync({force: true})
  })

  describe('User type', () => {
    it('has a user type', () => {
      const user = User.build({ type: "admin", email: "joe@shmo.com", address:"12 E St."});
      expect(user.type).to.be.equal("admin")
    });
    it ('has a enum value of admin, guest, or normal', () => {
      const user = User.build({ type: "google", email: "joe@shmo.com", address:"12 E St."});
      return user.validate().then(
        () => {
          throw new Error("Validations should fail without a valid type")
        },
        result => {
          expect(result).to.be.an.instanceOf(Sequelize.ValidationError);
        }
      )
    })
  })

  describe('User email', () => {
    it('demands a not null email address', () => {
      const user = User.build({ type: "admin", address:"12 E St."});
      return user.validate().then(
        () => {
          throw new Error("Validations should fail without an email")
        },
        result => {
          console.log(result)
          expect(result).to.be.an.instanceOf(Sequelize.ValidationError);
        }
      )
    })
    it('demands a valid email address', () => {
      const user = User.build({email: "boogie"});
      return user.validate().then(
        () => {
          throw new Error("Validations should fail without proper email format")
        },
        result => {
          expect(result).to.be.an.instanceOf(Sequelize.ValidationError);
        }
      )
    })
  })

  describe('User address', () => {
    it('demands a not null address', () => {
      const user = User.build(({ type: "admin", email: "joe@shmo.com"}));
      return user.validate().then(
        () => {
          throw new Error("Validations should fail without an address")
        },
        result => {
          expect(result).to.be.an.instanceOf(Error);
        }
      )
    })
  })




  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
