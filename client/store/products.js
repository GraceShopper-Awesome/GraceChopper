import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = {}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const products = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
