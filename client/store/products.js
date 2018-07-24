import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const products = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/allproducts')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const singleProduct = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch(err) {
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
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }

}
