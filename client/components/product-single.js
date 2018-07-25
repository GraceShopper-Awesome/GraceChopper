import React from 'react'
import {connect} from 'react-redux'
import {singleProduct, addToCart} from '../store'


class ProductSingle extends React.Component {
  constructor(props) {
    super(props)


    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getProduct(id)
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.addAProduct(this.props.product)
  }

  render() {
    const {title, description, price, imageUrl, stock} = this.props.product
    return (
      <div>
        <div id="productSingle"> 
        <h1>Product Name: {title}</h1>
        <p>Description: {description}</p>
        <h2>Price: {price}</h2>
        <h3>Stock: {stock}</h3>
        {imageUrl && imageUrl.length && imageUrl.map(el => <img src={el} />)}
      </div>
        <button onClick={(evt) => this.handleClick(evt)}>ADD TO CART!</button>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.products.product
  }
}

const mapDispatch = dispatch => {
    return {
      getProduct: id => dispatch(singleProduct(id)),
      addAProduct: product => dispatch(addToCart(product))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductSingle)
