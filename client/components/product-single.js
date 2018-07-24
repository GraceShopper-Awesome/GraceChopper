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
      console.log("this runs")
    const {id} = this.props.match.params;
    this.props.getProduct(id)
  }

  render() {
      const {title, description, imageUrl, price, stock} = this.props.product
      console.log(title)
    return (
        <div>
        <h1>Product Name: {title}</h1>
        <p>Description: {description}</p>
        <h2>Price: {price}</h2>
        <h3>Stock: {stock}</h3>
        <img src={imageUrl}/>

        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.products
  }
}

const mapDispatch = dispatch => {
    return {
      getProduct: id => dispatch(singleProduct(id))
    }
  }

export default connect(mapState, mapDispatch)(ProductSingle)
