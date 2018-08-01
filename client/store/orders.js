import axios from 'axios'

/**
 * Action Types
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

const GET_ALL_ORDER_ITEMS = 'GET_ALL_ORDER_ITEMS'
const GET_SINGLE_ORDER_ITEMS = 'GET_SINGLE_ORDER_ITEMS'
const EDIT_ORDER_STATUS = 'EDIT_ORDER_STATUS'

/**
 * ACTION CREATORS
 */
const getAllOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

const getUserOrders = orders => {
  return {
    type: GET_USER_ORDERS,
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
const editOrderStatus = status => {
  return {
    type: EDIT_ORDER_STATUS,
    status
  }
}

/**
 * THUNK CREATORS
 */
export const fetchUserOrders = userId => async dispatch => {
  const route = '/api/order/' + userId
  try {
    const res = await axios.get(route)
    dispatch(getUserOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/')
    dispatch(getAllOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrderItems = () => async dispatch => {
  try {
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
    dispatch(editOrderStatus(res.data[0].order.status))
  } catch (err) {
    console.error(err)
  }
}

export const changeOrderStatus = (status, orderId) => async dispatch => {
  try {
    const res = await axios.put(`/api/orders/${orderId}`, {status: status})
    dispatch(editOrderStatus(status))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */

const defaultOrders = {
  all: [],
  allItems: [],
  singleOrderItems: [],
  status: 'completed'
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
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
    case GET_USER_ORDERS:
      return {
        ...state,
        all: action.orders
      }
    case EDIT_ORDER_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}
