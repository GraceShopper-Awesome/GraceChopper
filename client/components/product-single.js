import React from 'react'
import {connect} from 'react-redux'

class ProductSingle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 1
    }
  }

  componentDidMount() {

  }

  render() {
    return <h1>Hello</h1>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = (state, id) => {
    return {
      getProduct: state.
    }
  }

export default connect(mapState)(ProductSingle)
