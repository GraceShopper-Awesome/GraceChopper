import React from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { products, fetchUserOrders, removeCartItem, addCartItem } from '../store'


class UserOrders extends React.Component {
  constructor(props){
    super(props)

    this.handleRemove= this.handleRemove.bind(this)
    this.handleButton= this.handleButton.bind(this)
  }

  async componentDidMount() {
    await this.props.getOrders(this.props.match.params.id)

  }

  handleButton(evt){
    evt.preventDefault()

    console.log(this.state.quantity)
  }



  async handleRemove(evt){
    evt.preventDefault()

  }



  render(){


    const {user, cart} = this.props
    console.log(user)
    const {email} = user
    let username;
    if(email){
      username = email.slice(0,email.indexOf("@"))
    } else username = "guest"
    if(username){
      return(
        <div>
          <div>
            <h1>{username}'s Cart</h1>

          </div>
          <Link to="/checkout"><button id="checkoutButton">Proceed to Checkout</button></Link>
        </div>
      )}
    else return <h1>Loading</h1>
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
    user: state.user,
    orders : state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    getOrders : (id) => dispatch(fetchUserOrders(id))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserOrders))
