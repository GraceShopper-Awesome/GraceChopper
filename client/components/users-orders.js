import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchUserOrders} from '../store'


class UserOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }

    this.handleButton = this.handleButton.bind(this)
  }

  async componentDidMount() {
    await this.props.getOrders(this.props.match.params.id)
    this.setState({orders: []})

  }

  handleButton(evt) {
    evt.preventDefault()
  }

  render() {
    const {user, orders} = this.props
    const {email} = user
    let username
    if (email) {
      username = email.slice(0, email.indexOf('@'))
    } else username = 'guest'
    if (username) {
      return (
        <div>
          <div>
            <h1>{username}'s Orders</h1>
            {orders.all.map(order => {
              return (
                <div key={order.id}>
                 <p>Total Cost: {order.totalCost}</p>
                  <p>Created: {order.createdAt}</p>
                  <Link to={{
                    pathname:`/order/${order.id}`,
                    state: {
                      createdAt:order.createdAt,
                      totalCost:order.totalCost
                    }
                  }}
                  >Link</Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    else return <h1>Loading</h1>
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
    user: state.user,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: (id) => dispatch(fetchUserOrders(id))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserOrders))
