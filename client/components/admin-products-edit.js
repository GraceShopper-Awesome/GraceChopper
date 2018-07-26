import React from 'react'
import {products, editProduct, singleProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AdminEditProduct extends React.Component {
  // constructor() {
  //   super()
  //   this.handleSubmit = this.handleSubmit.bind(this)
  // }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getProduct(id)
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   const updatedObj = {
  //     id: Number(this.props.match.params.id),
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     price: event.target.price.value,
  //     stock: event.target.stock.value,
  //     imageUrl: event.target.imageUrl.value.split(' ')
  //   }
  //   this.props.edit(updatedObj)
  //   this.props.history.push('/admin/products')
  // }

  render() {
    const {title, description, price, imageUrl, stock} = this.props.product
    const {handleSubmit} = this.props
    return (
      <div>
        <div id="productEdit">
          <form onSubmit={event => handleSubmit(event)}>
            <label htmlFor="title">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue="{this.props.product.title}"
            />
            <label htmlFor="description">Product Description</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="price">Price $</label>
            <input type="number" id="price" name="price" min="0" step="0.01" />
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" min="0" />
            <label htmlFor="imageUrl">Image URLs</label>
            <input type="text" id="imageUrl" name="imageUrl" />
            {/* <input
              type="textarea"
              rows="100"
              cols="400"
              id="imageUrl"
              name="imageUrl"
            /> */}
            <button type="submit">Update Product</button>
          </form>
        </div>
        {/* {imageUrl && imageUrl.length && imageUrl.map(el => <img src={el} />)} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const updatedObj = {
        id: Number(ownProps.match.params.id),
        title: event.target.title.value,
        description: event.target.description.value,
        price: event.target.price.value,
        stock: event.target.stock.value,
        imageUrl: event.target.imageUrl.value.split(' ')
      }
      dispatch(editProduct(updatedObj, ownProps.history))
    },
    getProduct: id => dispatch(singleProduct(id))
    // edit: product => dispatch(editProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct)
