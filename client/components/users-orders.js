import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserOrders = props => {
  console.log('fuck')
  return (
    <div>
      <h3>Welcome, BITCHHHHH </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    isAdmin: state.user.userType === "admin"
  }
}

export default withRouter(connect(mapState)(UserOrders))

/**
 * PROP TYPES
 */
