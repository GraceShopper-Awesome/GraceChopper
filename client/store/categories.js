import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = {
	all: [],
	active: []
}

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_ALL_CATEGORIES, categories})
export const toggleCategory = category => ({
	type: TOGGLE_CATEGORY,
	categoryToToggle: category
})


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
	console.log("state", state)
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return {
				...state,
				all: action.categories
			}
		case TOGGLE_CATEGORY: {
			const selected = action.category
			// const newActive = state.active.includes(selected) ?
			// 	state.active.filter(tag => tag !== selected) :
			// 	state.active.push(selected)
			const newActive = [];
			return {
				...state,
				active: newActive
			}
		}
		default:
			return state
	}
}
