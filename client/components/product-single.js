import React from 'react'
import {connect} from 'react-redux'
import {singleProduct} from '../store'

class ProductSingle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        product: {}
    }
  }

  componentDidMount() {
      console.log("this runs")
    const {id} = this.props.match.params;
    this.props.getProduct(id)
  }

  render() {
      const {title} = this.props.product
      console.log(title)
    return <h1>This is our product {title}</h1>
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
