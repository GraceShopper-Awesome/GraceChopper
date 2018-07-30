import React from 'react'
import {products, setProductAvailabilityOnServer} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AdminProducts extends React.Component {
  constructor() {
    super()
    this.handleNewProduct = this.handleNewProduct.bind(this)
    this.handleNewCategory = this.handleNewCategory.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleNewProduct() {
    this.props.history.push('/admin/products/add')
  }

  handleNewCategory() {
    this.props.history.push('/admin/categories')
  }

  handleAvailabilityChange = event => {
    const {target} = event
    this.props.availability(+target.value, target.checked)
    console.log("something changed?", target.value, target.checked)
    //do i need to update the component to reflect the store?
  }

  render() {
    if (!this.props.products.length) {
      return <h1>Loading</h1>
    } else {
      return (
        <div>
          <h1>Product Management</h1>
          <button type="submit" onClick={this.handleNewProduct}>
            Add New Product
          </button>
          <button type="submit" onClick={this.handleNewCategory}>
            Add New Product Category
          </button>
          <div>
            {this.props.products.map(elements => (
              <div id="mainInfo" key={elements.id}>
                <Link to={`/admin/products/${elements.id}`}>
                  <h1>{elements.title}</h1>
                </Link>
                <h3>${elements.price}</h3>
                <h3>{elements.stock} in stock</h3>
                {elements.imageUrl &&
                  elements.imageUrl && <img src={elements.imageUrl[0]} />}
                  <div>
                    <label>isAvailable?</label>
                    <input type="checkbox" value={elements.id} defaultChecked={elements.available} onChange={event => this.handleAvailabilityChange(event)}/>
                  </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(products())
  },
  availability: (id, flag) => {
    dispatch(setProductAvailabilityOnServer(id, flag))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
