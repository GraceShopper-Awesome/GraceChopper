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
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return {
				...state,
				all: action.categories
			}
		case TOGGLE_CATEGORY: {
			const {id} = action.categoryToToggle
			const newActive = state.active.includes(id) ?
				state.active.filter(tagId => tagId !== id) :
				(state.active.push(id), state.active)
			return {
				...state,
				active: newActive
			}
		}
		default:
			return state
	}
}
