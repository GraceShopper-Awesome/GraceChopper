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
        <h2>Logout</h2>
        </a>
        <Link to="/allproducts"><h2>All Products</h2></Link>
        <Link to={`/cart/${userId}` }><h2>Shopping Cart</h2></Link>
        <Link to={`/orders/${userId}`}><h2>Order History</h2></Link>
    </div>
    )}
    case "admin" : {return(
      <div id="navbar">
        <div id="navbarLogo">
          <Link to="/home"><img src="https://s22.postimg.cc/fi4va4nz3/grace_chopper.png" id="navbarLogo"/></Link>
        </div>
          <a href="#" onClick={handleClick}>
           <h2>Logout</h2>
          </a>
          <Link to="/admin/products"><h2>Products</h2></Link>
          <Link to="/admin/orders"><h2>Orders</h2></Link>
          <Link to="/admin/users"><h2>Users</h2></Link>
          <Link to="/admin/categories"><h2>Categories</h2></Link>
        </div>
    )}
    default: {return(
      <div id="navbar">
        <div id="navbarLogo">
          <Link to="/home"><img src="https://s22.postimg.cc/fi4va4nz3/grace_chopper.png" id="navbarLogo"/></Link>
        </div>
        <Link to="/login"><h2>Login</h2></Link>
        <Link to="/signup"><h2>Sign Up</h2></Link>
        <Link to="/allproducts"><h2>All Products</h2></Link>
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
