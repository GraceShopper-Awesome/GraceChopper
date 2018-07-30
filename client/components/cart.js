import React from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { products, getCart, removeCartItem, addCartItem } from '../store'


class Cart extends React.Component {
    constructor(props){
        super(props)

        this.handleRemove= this.handleRemove.bind(this)
        this.handleButton= this.handleButton.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        await this.props.getProduct()
        await this.props.getFromCart(this.props.match.params.id)
    }

    handleButton(evt){
        evt.preventDefault()
        
        console.log(this.state.quantity)
    }
    
    async handleRemove(evt){
        evt.preventDefault()
        await this.props.removeFromCart(evt.target.value)
        await this.props.getFromCart(this.props.match.params.id)
    }
    
    handleChange(evt){
        console.log(evt.target.value)
    }

    render(){

        const {user, cart} = this.props
        const {email} = user
        let username;
        console.log(cart)
        if(email){
            username = email.slice(0,email.indexOf("@"))
        } else username = "guest"
        if(username){
        return(
        <div>
            <div>
                <h1>{username}'s Cart</h1>
                {cart.map(element => (
                    <div id="itemList">
                        <div id="singleItem">
                            <img src={element.product.imageUrl}/>
                        </div>
                        <div id="itemText">
                            <h2>{element.product.title}</h2>
                            <h2>${element.product.price}</h2>
                            <div id="quantity">
                            <h4>Quantity: {element.quantity}</h4>
                            <button><h3>-</h3></button>
                            <button><h3>+</h3></button>
                            </div>
                            {/* <form onSubmit={this.handleButton}>
                                <label htmlFor="quantity">Quantity: {element.quantity}</label>
                                <input type="number" name="quantity"  defaultValue={element.quantity} min="1" max={element.product.stock} onChange={this.handleChange}/>
                                <button type="submit" >Change</button>
                            </form> */}
                        </div>
                            <p>{element.product.description}</p>
                            <button onClick={this.handleRemove} value={element.id}>Remove From Cart</button>
                    </div>
                ))}
            </div>
                <Link to="/checkout"><button id="checkoutButton">Proceed to Checkout</button></Link>
        </div>
        )}
        else return <h1>Loading</h1>
    }
}

const mapStateToProps = (state) => {
    return {
      cart: state.cart,
      product: state.products.products,
      user: state.user
    }
  }

const mapDispatchToProps = dispatch => {
    return  {
        getProduct : () => dispatch(products()),
        getFromCart : (id) => dispatch(getCart(id)),
        removeFromCart : (id) => dispatch(removeCartItem(id)),
        addAProduct: (userId ,productId, quantity) => dispatch(addCartItem(userId, productId, quantity))
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))