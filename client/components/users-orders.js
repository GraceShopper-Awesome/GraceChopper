import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserOrders = async (props )=> {

  console.log(props)
  return (
    <div>
      <h3>Welcome, BITCHHHHH </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(UserOrders))

/**
 * PROP TYPES
 */
