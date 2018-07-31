import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, userType, userId}) => {
  switch(userType) {
    case "normal": {return(
      <div id="navbar">
        <div id="navbarLogo">
          <Link to="/home"><img src="https://s22.postimg.cc/fi4va4nz3/grace_chopper.png" id="navbarLogo"/></Link>
        </div>
        <a href="#" onClick={handleClick}>
        <h1>Logout</h1>
        </a>
        <Link to="/allproducts"><h1>All Products</h1></Link>
        <Link to={`/cart/${userId}` }><h1>Shopping Cart</h1></Link>
        <Link to={`/orders/${userId}`}><h1>Order History</h1></Link>
    </div>
    )}
    case "admin" : {return(
      <div id="navbar">
        <div id="navbarLogo">
          <Link to="/home"><img src="https://s22.postimg.cc/fi4va4nz3/grace_chopper.png" id="navbarLogo"/></Link>
        </div>
          <a href="#" onClick={handleClick}>
           <h1>Logout</h1>
          </a>
          <Link to="/admin/products"><h1>Products</h1></Link>
          <Link to="/admin/orders"><h1>Orders</h1></Link>
          <Link to="/admin/users"><h1>Users</h1></Link>
          <Link to="/admin/categories"><h1>Categories</h1></Link>
        </div>
    )}
    default: {return(
      <div id="navbar">
        <div id="navbarLogo">
          <Link to="/home"><img src="https://s22.postimg.cc/fi4va4nz3/grace_chopper.png" id="navbarLogo"/></Link>
        </div>
        <Link to="/login"><h1>Login</h1></Link>
        <Link to="/signup"><h1>Sign Up</h1></Link>
        <Link to="/allproducts"><h1>All Products</h1></Link>
    </div>
    )}
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId : state.user.id,
    userType: state.user.userType
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
