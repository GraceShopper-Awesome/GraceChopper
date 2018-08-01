import React from 'react'
import {
  products,
  editProduct,
  singleProduct,
  setProductAvailabilityOnServer
} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllCategories} from '../store'

class AdminEditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: []
    }
  }

  async componentDidMount() {
    try {
      const {id} = this.props.match.params
      await this.props.getProduct(id)
      await this.props.fetchAllCategories()
      this.setState({checked: this.props.product.categories.map(cat => cat.id)})
    } catch (err) {
      console.error(err)
    }
  }
  handleChangeCategory = event => {
    const {target} = event
    if (target.checked === true) {
      this.setState({checked: [...this.state.checked, +target.value]})
    } else {
      const arr = this.state.checked
      const newArr = arr.filter(id => {
        return id !== +target.value
      })
      this.setState({
        checked: newArr
      })
    }
  }

  handleAvailabilityChange = event => {
    const {target} = event
    this.props.availability(+target.value, target.checked)
  }

  render() {
    const categoryArr = this.props.allCategories
    if (!categoryArr.length > 0) {
      return <h1>Loading</h1>
    }

    if (categoryArr.length > 0 && Object.keys(this.props.product).length > 0) {
      const productCategories = this.props.product.categories
      const productCategoryIds = productCategories.map(cat => cat.id)
      categoryArr.forEach(function(category) {
        for (let i = 0; i < productCategoryIds.length; i++) {
          if (productCategoryIds[i] === category.id) {
            category.checked = true
          }
        }
      })

      const {
        id,
        title,
        description,
        price,
        imageUrl,
        stock,
        available
      } = this.props.product
      const {handleSubmit} = this.props
      return (
        <div>
          <div id="productEdit">
            <form onSubmit={event => handleSubmit(event, this.state.checked)}>
              <label htmlFor="title">Product Title</label>
              <input type="text" id="title" name="title" defaultValue={title} />
              <label htmlFor="description">Product Description</label>
              <input
                type="text"
                id="description"
                name="description"
                defaultValue={description}
              />
              <label htmlFor="price">Price $</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                defaultValue={price}
              />
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                defaultValue={stock}
              />
              <label htmlFor="imageUrl">Image URLs</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                defaultValue={imageUrl}
              />
              <br />
              <label>Categories</label>
              <div>
                {categoryArr.map(category => {
                  return (
                    <div key={category.id}>
                      <input
                        type="checkbox"
                        value={category.id}
                        name={category.id}
                        defaultChecked={category.checked}
                        onChange={event => this.handleChangeCategory(event)}
                      />
                      {category.name}
                    </div>
                  )
                })}
              </div>
              <button type="submit">Update Product</button>
            </form>

            <div>
              <label>isAvailable?</label>
              <input
                type="checkbox"
                value={id}
                defaultChecked={available}
                onChange={event => this.handleAvailabilityChange(event)}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product,
    allCategories: state.categories.all
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllCategories: () => {
      dispatch(fetchAllCategories())
    },
    handleSubmit(event, checkedArr) {
      event.preventDefault()
      const updatedObj = {
        id: Number(ownProps.match.params.id),
        title: event.target.title.value,
        description: event.target.description.value,
        price: event.target.price.value,
        stock: event.target.stock.value,
        imageUrl: event.target.imageUrl.value.split(' '),
        categories: checkedArr
      }
      dispatch(editProduct(updatedObj, ownProps.history))
    },
    getProduct: id => dispatch(singleProduct(id)),
    availability: (id, flag) => {
      dispatch(setProductAvailabilityOnServer(id, flag))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct)
