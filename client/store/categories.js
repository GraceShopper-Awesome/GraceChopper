import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

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
const addCategory = category => ({
  type: ADD_CATEGORY,
  categoryToAdd: category
})
const removeCategory = id => ({
  type: REMOVE_CATEGORY,
  categoryIdToRemove: id
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
export const addCategoryToDatabase = name => async dispatch => {
  try {
    const res = await axios.post('/api/categories', {name: name})
    dispatch(addCategory(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const removeCategoryFromDatabase = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/categories/${id}`)
    dispatch(removeCategory(id)) //is this the best way to do this?
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  console.log(action.type)
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        all: action.categories
      }
    case TOGGLE_CATEGORY: {
      const {id} = action.categoryToToggle
      const newActive = state.active.includes(id)
        ? state.active.filter(tagId => tagId !== id)
        : [...state.active, id]
      return {
        ...state,
        active: newActive
      }
    }
    case ADD_CATEGORY:
      return {
        ...state,
        all: [...state.all, action.categoryToAdd]
      }
    case REMOVE_CATEGORY:
      return {
        ...state,
        all: state.all.filter(
          category => category.id !== action.categoryIdToRemove
        )
      }
    default:
      return state
  }
}
