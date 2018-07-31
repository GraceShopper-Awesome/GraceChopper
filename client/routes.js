import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ProductAll,
  ProductAddReview,
  ProductSingle,
  ProductSearchResults,
  AdminHome,
  AdminAddProduct,
  AdminEditProduct,
  AdminProducts,
  AdminOrders,
  AdminEditOrder,
  AdminUsers,
  AdminAddCategory,
  Cart,
  UserOrders,
  Checkout,
  SingleOrder
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/allproducts" component={ProductAll} />
        <Route path="/allproducts/results" component={ProductSearchResults} />
        <Route exact path="/products/:id" component={ProductSingle} />
        <Route path="/products/:id/review" component={ProductAddReview} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/products" component={AdminProducts} />
        <Route path="/admin/products/add" component={AdminAddProduct} />
        <Route path="/admin/products/:id" component={AdminEditProduct} />
        <Route path="/admin/orders/:id" component={AdminEditOrder} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/categories" component={AdminAddCategory} />
        <Route path="/cart/:id" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders/:id" component={UserOrders} />
        <Route path="/order/:orderId" component={SingleOrder} />


        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin' ? true : false
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
