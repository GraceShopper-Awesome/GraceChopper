import axios from 'axios'

/**
 * Action Types
 */

 const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
 const GET_ALL_ORDER_ITEMS = 'GET_ALL_ORDER_ITEMS'
 const GET_SINGLE_ORDER_ITEMS = 'GET_SINGLE_ORDER_ITEMS'

/**
* ACTION CREATORS
*/
const getAllOrders = orders => {
	return {
		type: GET_ALL_ORDERS,
		orders
	}
}
const getAllOrderItems = orderItems => {
	return {
		type: GET_ALL_ORDER_ITEMS,
		orderItems
	}
}
const getSingleOrderItems = items => {
	return {
		type: GET_SINGLE_ORDER_ITEMS,
		items
	}
}
/**
* THUNK CREATORS
*/
export const fetchAllOrders = () => async dispatch => {
	try{
		const res = await axios.get('/api/orders/')
		dispatch(getAllOrders(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const fetchAllOrderItems = () => async dispatch => {
	try{
		const res = await axios.get('/api/orders/all')
		dispatch(getAllOrderItems(res.data))
	} catch (err) {
		console.error(err)
	}
}
export const fetchSingleOrderItems = id => async dispatch => {
	try {
		const res = await axios.get(`/api/orders/${id}`)
		dispatch(getSingleOrderItems(res.data))
	} catch(err) {
		console.error(err)
	}
}

/**
* INITIAL STATE
*/

const defaultOrders = {
	all: [],
	allItems: [],
	singleOrderItems: []
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
	switch(action.type) {
		case GET_ALL_ORDERS:
			return {
				...state,
				all: action.orders
			}
		case GET_ALL_ORDER_ITEMS:
			return {
				...state,
				allItems: action.orderItems
			}
		case GET_SINGLE_ORDER_ITEMS:
			return {
				...state,
				items: action.items
			}
		default:
			return state
	}
}
