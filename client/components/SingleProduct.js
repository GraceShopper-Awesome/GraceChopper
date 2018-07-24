import React from 'react'
import { connect } from 'http2';

const SingleProduct = props => {

	return (
		<h1>Hello</h1>
	)
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product
  }
}

export default connect(mapState)(SingleProduct)
