import React from 'react'
import {connect} from 'react-redux'
import {getAllUsers, deleteUser, makeAdmin} from '../store/user-management'

class AdminUsers extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdmin = this.handleAdmin.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleDelete(event) {
    this.props.delete(event.target.value)
  }

  handleAdmin(event) {
    console.log('handleAdmin event.target.value', event.target.value)
    this.props.makeAdmin(event.target.value)
  }

  render() {
    return (
      <div>
        <h1>User Management</h1>
        <div className="userContainer">
          {this.props.users.map(user => (
            <div className="singleUserMgmt" key={user.id}>
              <h3>{user.email}</h3>
              <button type="button" value={user.id} onClick={this.handleAdmin}>
                Make Admin
              </button>
              <button type="button">Reset Password</button>
              <button type="button" value={user.id} onClick={this.handleDelete}>
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(getAllUsers()),
  delete: id => dispatch(deleteUser(id)),
  makeAdmin: id => dispatch(makeAdmin(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
