import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = "ADD_TO_CART"
const GET_ALL_CART_PRODUCTS = "GET_ALL_CART_PRODUCTS" 
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const EDIT_CART = "EDIT_CART" 

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
export const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const editCart = product => ({type: EDIT_CART, product})
const getAllFromCart = products => ({type: GET_ALL_CART_PRODUCTS, products}) 


/**
 * THUNK CREATORS
 */

export const getCart = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getAllFromCart(res.data))
  } catch(error){
    console.log(error)
  }
}

// export const singleProduct = (id) => async dispatch => {
//   try {
//     const res = await axios.get(`/api/products/${id}`)
//     dispatch(getSingleProduct(res.data))
//   } catch(err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_ALL_CART_PRODUCTS:
      console.log(action)
      return action.products
    case ADD_TO_CART:
      return [...state, {id: action.product.id, }]
    default:
      return state
  }

}
