import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {submitCart, products, me, getCart} from '../store'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      email: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.user !== nextProps.user) {
      this.props.getCartItems(nextProps.user.id)
      // this.setState({address: this.props.user.address, email: this.props.user.email})
    }
  }

  submitOrder = event => {
    event.preventDefault();
    this.props.submit(this.props.cart[0].orderId, this.state.address, this.state.email)
    this.props.history.push(`/allproducts`)
  }

  handleChange = event => {
    this.setState({[event.target.name]:event.target.value})
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
          <form onChange={event => this.handleChange(event)} onSubmit={event => this.submitOrder(event)}>
            <label>Address:</label>
            <input name="address" required defaultValue={this.props.user.address}/>
            <label>Email:</label>
            <input name="email" required type="email" defaultValue={this.props.user.email}/>
            <button type="submit">Buy</button>
			    </form>
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
    submit: (cartId, email, address) => dispatch(submitCart(cartId, email, address)),
    getCartItems: id => dispatch(getCart(id)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
