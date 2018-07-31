import React from 'react'
import {addNewProduct} from '../store/products'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../store'

class AdminAddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: []
    }
  }

  componentDidMount() {
    this.props.fetchAllCategories()
  }

  handleSubmitCategory = event => {
    event.preventDefault()
  }

  handleChangeCategory = event => {
    const {target} = event
    if (target.checked === true) {
      this.setState({checked: [...this.state.checked, target.value]})
    } else {
      const arr = this.state.checked
      const newArr = arr.filter(id => {
        return id !== target.value
      })
      this.setState({
        checked: newArr
      })
    }
  }

  render() {
    const categoryArr = this.props.allCategories
    if (categoryArr.length > 0) {
      categoryArr.forEach(function(category) {
        category.checked = false
      })
    }
    const {handleSubmit} = this.props
    if (!categoryArr.length > 0) {
      return <h1>Loading</h1>
    }
    return (
      <div>
        <h1>Add New Product</h1>
        <div>
          <form onSubmit={event => handleSubmit(event, this.state.checked)}>
            <label htmlFor="title">Product Title</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="description">Product Description</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="price">Price $</label>
            <input type="number" id="price" name="price" min="0" step="0.01" />
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" min="0" />
            <label htmlFor="imageUrl">Image URLs</label>
            <input
              type="textarea"
              rows="100"
              cols="400"
              id="imageUrl"
              name="imageUrl"
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
                      defaultChecked={false}
                      onChange={event => this.handleChangeCategory(event)}
                    />
                    {category.name}
                  </div>
                )
              })}
            </div>
            <button type="submit">Add New Product</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(event, checkedArr) {
      event.preventDefault()
      const newProductData = {
        title: event.target.title.value,
        description: event.target.description.value,
        price: event.target.price.value,
        stock: event.target.stock.value,
        imageUrl: event.target.imageUrl.value.split(' '),
        categories: checkedArr
      }
      dispatch(addNewProduct(newProductData, ownProps.history))
    },
    fetchAllCategories: () => {
      dispatch(fetchAllCategories())
    }
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.categories.all
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)
