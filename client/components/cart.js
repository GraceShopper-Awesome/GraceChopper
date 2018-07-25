import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { products } from '../store'


class Cart extends React.Component {
    componentDidMount() {
        this.props.getProduct()
        this.handleChange= this.handleChange.bind(this)
        this.handleRemove= this.handleRemove.bind(this)
    }

    handleChange(){

    }

    handleRemove(){

    }

    render(){
        console.log("This.props.cart", this.props.cart)
        return(
        <div>
            {/* {this.props.cart.map(element => (
                <h1 key={element.id}>{element.id}</h1>
            ))} */}
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
            <p>Lorem Ipsum suck a dick.</p>
        </div>
            <button id="checkoutButton">Proceed to Checkout</button>
        </div>
        )
    }
}

{/* <label htmlFor='campusId'><h4>Campus</h4></label>
<select name='campusId' onChange={this.handleChange}>
    {this.props.campuses.map((campus) => (<option name='campusId' value = {campus.id} key = {campus.id}>{campus.name}</option>))}
</select> */}

const mapStateToProps = state => {
    return {
      cart: state.cart,
      product: state.products.products
    }
  }

const mapDispatchToProps = dispatch => {
    return  {getProduct : () => dispatch(products())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)