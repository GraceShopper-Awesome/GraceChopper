import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store'
import {Link} from 'react-router-dom'

export class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div>
        <h1>Order Management</h1>
        {this.props.orders.map(order => {
          return (
        <div key={order.id}>
          <Link to={`/admin/orders/${order.id}`}>Order Id: {order.id}, User Id: {order.userId}, Status: {order.status}</Link>
        </div>)})}
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
