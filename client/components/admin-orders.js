import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store'
import {Link} from 'react-router-dom'

export class AdminOrders extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 'all'
    }
  }
  componentDidMount() {
    this.props.fetchOrders();
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>Order Management</h1>
        <select onChange={this.handleChange}>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="processing">Processing</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        {this.props.orders.map(order => {
          if(this.state.value === 'all' || this.state.value === order.status) {
            return (
              <div key={order.id}>
                <Link to={`/admin/orders/${order.id}`}>Order Id: {order.id}, User Id: {order.userId}, Status: {order.status}</Link>
              </div>)
          }
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders.all
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(mapState,mapDispatch)(AdminOrders)
