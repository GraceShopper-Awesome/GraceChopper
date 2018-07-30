import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_ALL_CART_PRODUCTS = 'GET_ALL_CART_PRODUCTS'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EDIT_CART = 'EDIT_CART'
const SUBMIT_CART = 'SUBMIT_CART'


/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const editCart = product => ({type: EDIT_CART, product})
const getAllFromCart = products => ({type: GET_ALL_CART_PRODUCTS, products})
const submitCartAsOrder = () => ({type: SUBMIT_CART})

/**
 * THUNK CREATORS
 */



export const getCart = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getAllFromCart(res.data))
  } catch (error) {
    console.log(error)
  }
}


export const submitCart = (id) => async dispatch => {
  try {
    await axios.post('/api/cart/' + id)
    dispatch(submitCartAsOrder())

  }
  catch (err) {
    console.log(err)

  }
}

export const addCartItem = (orderId, userId, quantity) => async dispatch => {

  try{
     console.log(userId, productId, quantity)
    const res = await axios.put(`/api/cart/`, {userId, productId, quantity})
    
    dispatch(addToCart(res.data[0]))
  } catch(error){
    console.log(error)
  }
}

export const removeCartItem = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/cart/${id}`)
    dispatch(removeFromCart(res.data))
  } catch (error){
    console.log(error)
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
    default:
      return state
  }

}
