import React from 'react'
import {connect} from 'react-redux'
import {singleProduct} from '../store'

class ProductSingle extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //     product: {}
    // }
  }

  componentDidMount() {
    console.log('this runs')
    const {id} = this.props.match.params
    this.props.getProduct(id)
  }

  render() {
    console.log('this.props.product', this.props.product)
    const {title, description, price, imageUrl, stock} = this.props.product
    // console.log('imageUrl', this.props.product.imageUrl[0])
    return (
      <div>
        <h1>Product Name: {title}</h1>
        <p>Description: {description}</p>
        <h2>Price: {price}</h2>
        <h3>Stock: {stock}</h3>
        {/* <image src={imageUrl[0]} /> */}
        {imageUrl && imageUrl.length && imageUrl.map(el => <img src={el} />)}
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
    getProduct: id => dispatch(singleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(ProductSingle)
