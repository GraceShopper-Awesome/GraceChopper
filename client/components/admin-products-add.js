import React from 'react'
import {products} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export default class AdminAddProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const newProductData = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      stock: event.target.stock.value,
      imageUrl: event.target.imageUrl.value
    }
  }

  render() {
    return (
      <div>
        <h1>Add New Product</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Product Title</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="description">Product Description</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="price">Price $</label>
            <input type="number" id="price" name="price" min="0" step="0.01" />
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" min="0" />
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" />
            <button type="submit">Add New Product</button>
          </form>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     products: state.products
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   fetchProducts: () => {
//     dispatch(products())
//   }
// })

// export default connect(null, mapDispatchToProps)(AdminNewProduct)
