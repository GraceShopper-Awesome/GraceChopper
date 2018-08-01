import React from 'react'
import { plusCart, minusCart, getCart, removeCartItem } from '../store'
import { connect } from 'react-redux';


class CartSingle extends React.Component {
    constructor(props){
        super(props)

        this.handleIncrement=this.handleIncrement.bind(this)
        this.handleDecrement=this.handleDecrement.bind(this)
        this.handleRemove= this.handleRemove.bind(this)
    }

    async handleIncrement(){
        try {
            if(this.props.item.product.stock > this.props.item.quantity){
                await this.props.incCart(this.props.item.id)
                await this.props.getAllCart(+this.props.user)
            } else {
                alert("This is all we have in stock!")
            }
        } catch(err) {
            console.error(err)
        }
    }

    async handleDecrement(){
        try {
            await this.props.decCart(this.props.item.id)
            await this.props.getAllCart(+this.props.user)
        } catch(err) {
            console.error(err)
        }
    }

    async handleRemove(evt){
        try {
            evt.preventDefault()
            await this.props.removeFromCart(evt.target.value)
            await this.props.getAllCart(+this.props.user)
        } catch(err) {
            console.error(err)
        }
    }


    render(){
        const element = this.props.item
        return(
            <div id="itemList" key={element.id}>
                    <img src={element.product.imageUrl} className="thumbnail"/>
                <div id="itemText">
                    <h2>{element.product.title}</h2>
                    <h2>${element.product.price}</h2>
                    <div>
                        <h4 id="quantity">Quantity: {element.quantity}</h4>
                        <button onClick={this.handleDecrement} className="quantityButton"><h3>-</h3></button>
                        <button onClick={this.handleIncrement} className="quantityButton"><h3>+</h3></button>
                    </div>
                </div>
                <div id="description">
                    <h2>{element.product.description}</h2>
                    <button onClick={this.handleRemove} value={element.id}>Remove From Cart</button>
                </div>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        incCart : (userId, productId) => dispatch(plusCart(userId, productId)),
        decCart : (userId, productId) => dispatch(minusCart(userId, productId)),
        getAllCart: (userId) => dispatch(getCart(userId)),
        removeFromCart : (id) => dispatch(removeCartItem(id))
    }

}

export default connect(null, mapDispatch)(CartSingle)
