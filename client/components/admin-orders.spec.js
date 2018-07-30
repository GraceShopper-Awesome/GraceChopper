/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AdminOrders} from './admin-orders'
import {Link} from 'react-router-dom'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AdminOrders', () => {
	let adminOrders
	let ordersArr = [{id: 1, userId: 2, status: 'pending'},
									{id: 2, userId: 4, status: 'completed'}]

  beforeEach(() => {
    adminOrders = shallow(<AdminOrders orders={ordersArr} fetchOrders={() => console.log()}/>)
	})

  it('renders the Order Management component', () => {
		expect(adminOrders.find('h1').text()).to.be.equal('Order Management');
	})

	it('renders the orders ids, userids, statuses', () => {
		expect(adminOrders.find({to: `/admin/orders/${ordersArr[0].id}`}).name()).to.be.equal('Link')
		expect(adminOrders.find({to: `/admin/orders/${ordersArr[1].id}`}).name()).to.be.equal('Link')
  })
})
