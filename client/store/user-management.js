import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DELETED_USER = 'GET_DELETED_USER'
const GET_ALL_USERS_FROM_SERVER = 'GET_ALL_USERS_FROM_SERVER'
const GET_UPDATED_ADMIN_USER = 'GET_UPDATED_ADMIN_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getDeletedUser = id => ({
  type: GET_DELETED_USER,
  id
})
const getAllUsersFromServer = users => ({
  type: GET_ALL_USERS_FROM_SERVER,
  users
})

const getUpdatedAdminUser = user => ({
  type: GET_UPDATED_ADMIN_USER,
  user
})

/**
 * THUNK CREATORS
 */
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    console.log('user res.data', res.data)
    dispatch(getAllUsersFromServer(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = id => async dispatch => {
  try {
    const qtyOfDeleted = await axios.delete(`/api/users/${id}`)
    const idNumber = Number(id)
    dispatch(getDeletedUser(idNumber))
  } catch (err) {
    console.error(err)
  }
}

export const makeAdmin = id => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${id}`, id)
    dispatch(getUpdatedAdminUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS_FROM_SERVER:
      return action.users
    case GET_DELETED_USER:
      const userDeleteFilter = state.filter(function(elem) {
        if (elem.id !== action.id) {
          return elem
        }
      })
      return userDeleteFilter
    case GET_UPDATED_ADMIN_USER:
      const userUpdateFilter = state.map(function(elem) {
        if (elem.id == action.user.id) {
          elem = action.user
        }
        return elem
      })
      return userUpdateFilter
    default:
      return state
  }
}
