import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('props',props)
  if(props.isAdmin) props.history.push('/admin')
  return (
    <div className="home">
      <h1>Welcome, {email.slice(0,email.indexOf("@"))}</h1>
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
