import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import usersReducer from './user-management'
import productReducer from './products'
import categoryReducer from './categories'
import cartReducer from './cart'
import orderReducder from './orders'

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  products: productReducer,
  categories: categoryReducer,
  cart: cartReducer,
  orders: orderReducder
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './categories'
export * from './cart'
export * from './user-management'
export * from './orders'
