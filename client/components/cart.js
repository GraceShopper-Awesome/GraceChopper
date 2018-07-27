import React from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { products, getCart } from '../store'


class Cart extends React.Component {
    async componentDidMount() {
        await this.props.getProduct()
        await this.props.getFromCart(this.props.match.params.id)
        this.handleChange= this.handleChange.bind(this)
        this.handleRemove= this.handleRemove.bind(this)
    }

    handleChange(){

    }

    handleRemove(){

    }

    render(){

        const {user, cart} = this.props
        const {email} = user
        console.log(cart)
        let username;
        if(email){
            username = email.slice(0,email.indexOf("@"))
        } else username = "guest"
        if(username){
        return(
        <div>
            {/* {this.props.cart.map(element => (
                <h1 key={element.id}>{element.id}</h1>
            ))} */}
            <h1>{username}'s Cart</h1>
            <div id="itemList">
            <div id="singleItem">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/LAPD_Bell_206_Jetranger.jpg"/>
            </div>
            <div id="itemText">
                <h2>Product Name</h2>
                <h2>$Price.00</h2>
                <form>
                {/* max is quantity, default value is 1 or previous quantity*/}
                <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" min="1"  onChange={(evt) => handleChange(evt)}/>
                </form>
            </div>
            <p>Lorem Ipsum dirty language.</p>
        </div>
            <Link to="/checkout"><button id="checkoutButton">Proceed to Checkout</button></Link>
        </div>
        )}
        else return <h1>Loading</h1>
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("ownProps", ownProps)
    return {
      cart: state.cart,
      product: state.products.products,
      user: state.user
    }
  }

const mapDispatchToProps = dispatch => {
    return  {
        getProduct : () => dispatch(products()),
        getFromCart : (id) => dispatch(getCart(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))