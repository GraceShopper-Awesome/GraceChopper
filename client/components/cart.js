import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {products, getCart, removeCartItem} from '../store'
import CartSingle from './cart-single'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getProduct()
      await this.props.getFromCart(this.props.match.params.id)
    } catch (err) {
      console.error(err)
    }
  }

  handleButton(evt) {
    evt.preventDefault()
  }

  async handleRemove(evt) {
    try {
      evt.preventDefault()
      await this.props.removeFromCart(evt.target.value)
      await this.props.getFromCart(this.props.match.params.id)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    let {user, cart} = this.props
    const {email} = user
    let username
    if (email) {
      username = email.slice(0, email.indexOf('@'))
    } else username = 'guest'
    if (username) {
      return (
        <div>

          <div>
            <h1>{username}'s Cart</h1>
            {cart.map(element => (
              <CartSingle
                key={element.id}
                item={element}
                user={this.props.match.params.id}
              />
            ))}
          </div>
                <Link to="/checkout"><button>Proceed to Checkout</button></Link>

        </div>
      )
    } else return <h1>Loading</h1>
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    product: state.products.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: () => dispatch(products()),
    getFromCart: id => dispatch(getCart(id)),
    removeFromCart: id => dispatch(removeCartItem(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
