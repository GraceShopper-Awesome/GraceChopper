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
    this.props.makeAdmin(event.target.value)
  }

  render() {
    if (!this.props.users.length) {
      return <h1>Loading</h1>
    } else {
      console.log('this.props.user', this.props.user)
      // const filteredForCurrent = this.props.users.filter(function(elem) {
      //   if (elem.id !== this.props.user.id) {
      //     return elem
      //   }
      // })
      // console.log('fitleredForCurrent', filteredForCurrent)
      return (
        <div className="adminUserContainer">
          <div className="adminUserInner">
            <h1 id="adminUserHeader">User Management</h1>
            <div className="userContainer">
              {this.props.users.map(user => (
                <div className="singleUserMgmt" key={user.id}>
                  <h3 id="adminUserHeader">{user.email}</h3>
                  <div className="adminUserButtons">
                    <button
                      type="button"
                      value={user.id}
                      onClick={this.handleAdmin}
                      id="makeAdmin"
                    >
                      Make Admin
                    </button>
                    <button
                      type="button"
                      value={user.id}
                      onClick={this.handleDelete}
                      id="adminDelete"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
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
