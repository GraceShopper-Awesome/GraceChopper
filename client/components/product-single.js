import React from 'react'
import {connect} from 'react-redux'
import {singleProduct, addCartItem, getCart} from '../store'

class ProductSingle extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getProduct(id)
  }

  async handleClick(evt) {
    evt.preventDefault()
    await this.props.addAProduct(this.props.user.id, this.props.product.id, 1)
    await this.props.getFromCart(this.props.user.id)
  }

  render() {
    if (!this.props.product) {
      return <h1>Loading</h1>
    } else {
      const {
        title,
        description,
        price,
        imageUrl,
        stock,
        id
      } = this.props.product
      return (
        <div>
          <div id="productSingle">
            <h1>Product Name: {title}</h1>
            <p>Description: {description}</p>
            <h2>Price: {price}</h2>
            <h3>Stock: {stock}</h3>
            {imageUrl &&
              imageUrl.length &&
              imageUrl.map(el => <img key={id} src={el} />)}
            <button onClick={this.handleClick}>Add To Cart</button>
          </div>
        </div>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    product: state.products.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(singleProduct(id)),
    addAProduct: (userId ,productId, quantity) => dispatch(addCartItem(userId, productId, quantity)),
    getFromCart: (id) => dispatch(getCart(id))
  }
}

export default connect(mapState, mapDispatch)(ProductSingle)
