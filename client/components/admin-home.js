import React from 'react'

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
      <div className="adminHomePage">
        <h1 id="headerMargin">Admin Controls</h1>
        <div className="adminHome">
          <button type="submit" onClick={this.handleProduct}>
            Product Management
          </button>
          <button
            type="submit"
            onClick={this.handleOrder}
            id="adminOrderButton"
          >
            Order Management
          </button>
          <button type="submit" onClick={this.handleUser}>
            User Management
          </button>
        </div>
      </div>
    )
  }
}
