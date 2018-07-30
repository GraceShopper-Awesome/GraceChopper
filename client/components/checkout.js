import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { submitCart , products, me} from '../store'


let orderTotal = 0


class Checkout extends React.Component {
  constructor(props){
    super (props)


  }

  componentDidMount() {
    orderTotal=0
    this.props.getUser()
  }

  async submitOrder() {

    await this.props.submit(this.props.user.id)
    //bill this bitch and take their money


  }

  render() {
    const {user, cart} = this.props


    const {email} = user
    let username
    if (email) {
      username = email.slice(0, email.indexOf('@'))
    } else username = 'guest'
    if (username) {
      return (
        <div>
          <h1>{username}'s Cart</h1>
          {cart.map(element => (


            <div id="itemList" key={element.id}>
              {orderTotal += element.product.price * element.quantity}
              <div id="singleItem">
                <img src={element.product.imageUrl}/>
              </div>
              <div id="itemText">

                <h2>{element.product.title}</h2>
                <h2>Price per item: {element.product.price}</h2>
                <h2>Total Price: ${element.product.price * element.quantity}</h2>
                <label htmlFor="quantity">Quantity: {element.quantity}</label>
              </div>
              <p>{element.product.description}</p>
            </div>
          ))}

          <p>Order Total: {orderTotal}</p>
          <button onClick={this.submitOrder}>Submit order</button>

        </div>
      )
    } else return <h1>Loading</h1>
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
    submit: (userId) => dispatch(submitCart(userId))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))
