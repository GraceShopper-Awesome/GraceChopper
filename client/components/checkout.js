import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {submitCart, products, me} from '../store'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  submitOrder = event => {
    event.preventDefault();
    this.props.submit(this.props.cart[0].orderId)
    this.props.history.push(`/allproducts`)
  }

  render() {
    const {cart} = this.props
      return (
        <div>
          {cart.map(element => (
            <div id="itemList" key={element.id}>
              <div id="singleItem">
                <img src={element.product.imageUrl} />
              </div>
              <div id="itemText">
                <h2>{element.product.title}</h2>
                <h2>Price per item: {element.product.price}</h2>
                <label htmlFor="quantity">Quantity: {element.quantity}</label>
              </div>
              <p>{element.product.description}</p>
            </div>
          ))}
          <h2>
            Total Price: ${cart.totalCost}
          </h2>

          <button type="button" onClick={event => this.submitOrder(event)}>Buy</button>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(products()),
    getUser: () => dispatch(me()),
    submit: cartId => dispatch(submitCart(cartId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
