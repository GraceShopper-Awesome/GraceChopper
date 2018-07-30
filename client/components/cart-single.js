import React from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { products, getCart, removeCartItem } from '../store'


export default class CartSingle extends React.Component {
    constructor(props){
        super(props)

    }

    render(){
        const element = this.props.props
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
                        <button><h3>-</h3></button>
                        <button><h3>+</h3></button>
                    </div>
                </div>
                <p>{element.product.description}</p>
                <button onClick={this.handleRemove} value={element.id}>Remove From Cart</button>
            </div>
        )
    }
}
