import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userType}) => {
  switch(userType) {
    case "normal": {return(
      <div id="navbar">
      <Link to="/home"><h1>GRACE'S CHOPPERS</h1></Link>
      <nav>
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/allproducts">All Products</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>
      </nav>
      <hr />
    </div>
    )}
    case "admin" : {return(
      <div id="navbar">
      <Link to="/admin"><h1>GRACE'S CHOPPERS</h1></Link>
      <nav>
          <div>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/categories">Categories</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
      </nav>
      <hr />
    </div>
    )}
    default: {return(
      <div id="navbar">
      <Link to="/home"><h1>GRACE'S CHOPPERS</h1></Link>
      <nav>
          <div id="navbarLinks">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/allproducts">All Products</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>
      </nav>
      <hr />
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
