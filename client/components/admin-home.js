import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export default class AdminHome extends React.Component {
  constructor() {
    super()
    this.handleProduct = this.handleProduct.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
    this.handleUser = this.handleUser.bind(this)
  }

  handleProduct(event) {
    this.props.history.push('/admin/products')
  }

  handleOrder(event) {
    this.props.history.push('/admin/orders')
  }

  handleUser(event) {
    this.props.history.push('/admin/users')
  }

  render() {
    return (
      <div>
        <h1>Admin Home Page</h1>
        <button type="submit" onClick={this.handleProduct}>
          Product Management
        </button>
        <button type="submit" onClick={this.handleOrder}>
          Order Management
        </button>
        <button type="submit" onClick={this.handleUser}>
          User Management
        </button>
      </div>
    )
  }
}

// /**
//  * COMPONENT
//  */
// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
