import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_ALL_CART_PRODUCTS = 'GET_ALL_CART_PRODUCTS'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const SUBMIT_CART = 'SUBMIT_CART'
const INC_CART = 'INC_CART'
const DEC_CART = 'DEC_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const incrementCart = product => ({type: INC_CART, product})
const decrementCart = product => ({type: DEC_CART, product})
const getAllFromCart = products => ({type: GET_ALL_CART_PRODUCTS, products})
const submitCartAsOrder = () => ({type: SUBMIT_CART})

/**
 * THUNK CREATORS
 */
export const getCart = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getAllFromCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const plusCart = orderitemId => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/increment/`, {orderitemId})
    dispatch(incrementCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const minusCart = orderitemId => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/decrement/`, {orderitemId})
    dispatch(decrementCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const submitCart = (id, address, email) => async dispatch => {
  try {
    await axios.post(`/api/cart/${id}`)
    await axios.post(`/api/email/${id}`, {address, email})
    dispatch(submitCartAsOrder())
  } catch (err) {
    console.error(err)
  }
}

export const addCartItem = (userId, productId, quantity) => async dispatch => {
  try {
    const res = await axios.put(`/api/cart/`, {userId, productId, quantity})
    dispatch(addToCart(res.data[0]))
  } catch (error) {
    console.error(error)
  }
}

export const removeCartItem = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/cart/${id}`)
    dispatch(removeFromCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_ALL_CART_PRODUCTS:
      return action.products
    case ADD_TO_CART:
      return [...state, action.product]
    case SUBMIT_CART:
      state = defaultCart
      return state
    case INC_CART:
      return [...state]
    case DEC_CART:
      return [...state]
    default:
      return state
  }
}
