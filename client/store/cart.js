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
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const addToCart = product => ({type: ADD_TO_CART, product})
const removeFromCart = product => ({type: REMOVE_FROM_CART, product})
const editCart = product => ({type: EDIT_CART, product})
const getAllFromCart = products => ({type: GET_ALL_CART_PRODUCTS, products}) 


/**
 * THUNK CREATORS
 */
<<<<<<< HEAD
export const products = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart/allproducts')
    dispatch(getAllFromCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addproduct = () => async dispatch => {
  try {
    const res = await axios.post(`/api/cart/`)
    dispatch(addToCart(res.data))
  } catch(err) {
    console.error(err)
  }
}
=======
// export const products = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/products/allproducts')
//     dispatch(getProducts(res.data))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const singleProduct = (id) => async dispatch => {
//   try {
//     const res = await axios.get(`/api/products/${id}`)
//     dispatch(getSingleProduct(res.data))
//   } catch(err) {
//     console.error(err)
//   }
// }
>>>>>>> 63379834ab1adf7f2ac700e5cad14253e295990a

/**
 * REDUCER
 */
<<<<<<< HEAD
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_ALL_CART_PRODUCTS:
      return action.products
    case ADD_TO_CART:
      return action.product
    default:
      return state
  }

}
=======
// export default function(state = defaultProducts, action) {
//   switch (action.type) {
//     case GET_ALL_PRODUCTS:
//       return action.products
//     case GET_SINGLE_PRODUCT:
//       return action.product
//     default:
//       return state
//   }

// }
>>>>>>> 63379834ab1adf7f2ac700e5cad14253e295990a
