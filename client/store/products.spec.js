/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {products} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
	let store
	let mockAxios

	const intialState = {products: {}}

	beforeEach(() => {
		mockAxios = new MockAdapter(axios)
		store = mockStore(intialState)
	})

	afterEach(() => {
    mockAxios.restore()
    store.clearActions()
	})

	describe('getting all products', () => {
    it('eventually dispatches the GET_ALL_PRODUCTS action', async () => {
      const fakeProduct = {title: 'nice helicopter', price: 1, stock: 22, description: 'a nice helicopter', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR265PzaKrETWVuu-RUS5K7Xb-xyYLcn2YWIHTUne8_sEjZd63x'}
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      await store.dispatch(products())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProduct)
    })
  })
})
