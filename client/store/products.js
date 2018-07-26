import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_EDITED_PRODUCT = 'GET_EDITED_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  product: {}
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const getEditedProduct = product => ({type: GET_EDITED_PRODUCT, product})

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

export const singleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewProduct = (productAndCategories, history) => async dispatch => {
  try {
    const res = await axios.post('/api/products/admin/add', productAndCategories)
    dispatch(addProduct(res.data))
    history.push(`/products/${res.data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const editProduct = (product, history) => async dispatch => {
  try {
    const res = await axios.put(`/api/products/admin/${product.id}`, product)
    dispatch(getEditedProduct(res.data))
    history.push(`/admin/products`)
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
      return {
        ...state,
        products: action.products
      }
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case GET_EDITED_PRODUCT:
      const updatedProducts = state.products.map(function(elem) {
        if (elem.id == action.product.id) {
          elem = action.product
        }
        return elem
      })
      return {
        ...state,
        products: updatedProducts
      }
    default:
      return state
  }
}
