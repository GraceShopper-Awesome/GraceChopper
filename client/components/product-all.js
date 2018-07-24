import React from 'react'
import {connect} from 'react-redux'
import { products } from '../store/products'

const ProductAll = () => (
            <div>
                <div id='mainInfo'>
                    <h1>The Americano</h1>
                    <h3>$89,000.99</h3>
                    <h3>12 in stock</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgqxG7OrycnsLzC7z-7teE44UgAUop96T69UwYWgx1DwAWl__0g"/>
                </div>
            </div>

        )
    

const mapStatetoProps = state => {
    return{
        products: state.products
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => {
        dispatch(products())
    }
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductAll)