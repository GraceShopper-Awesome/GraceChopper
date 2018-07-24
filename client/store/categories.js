import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_ALL_CATEGORIES, categories})


/**
 * THUNK CREATORS
 */
export const fetchAllCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories')
    dispatch(getCategories(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return action.categories
		default:
			return state
	}
}
