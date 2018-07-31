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
        if(this.props.item.product.stock > this.props.item.quantity){
            await this.props.incCart(this.props.item.id)
            await this.props.getAllCart(+this.props.user)
        } else {
            alert("This is all we have in stock!")
        }
    }

    async handleDecrement(){
        await this.props.decCart(this.props.item.id)
        await this.props.getAllCart(+this.props.user)
    }

    async handleRemove(evt){
        evt.preventDefault()
        await this.props.removeFromCart(evt.target.value)
        await this.props.getAllCart(+this.props.user)
    }


    render(){
        const element = this.props.item
        return(
            <div id="itemList" key={element.id}>
                <div id="singleItem">
                    <img src={element.product.imageUrl}/>
                </div>
                <div id="itemText">
                    <h2>{element.product.title}</h2>
                    <h2>${element.product.price}</h2>
                    <div id="quantity">
                        <h4>Quantity: {element.quantity}</h4>
                        <button onClick={this.handleDecrement}><h3>-</h3></button>
                        <button onClick={this.handleIncrement}><h3>+</h3></button>
                    </div>
                </div>
                <p>{element.product.description}</p>
                <button onClick={this.handleRemove} value={element.id}>Remove From Cart</button>
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
