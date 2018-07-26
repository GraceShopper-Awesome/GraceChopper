import React from 'react'
import {products, addNewProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllCategories} from '../store'

class AdminAddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      categoryValue: '',
      checked: []
    }
  }

  componentDidMount() {
    this.props.fetchAllCategories()
    let categoryArr = this.props.allCategories
    this.setState({
      categoryValue: this.props.allCategories[0],
      checked: categoryArr
    })
  }

  handleSubmitCategory = event => {
    event.preventDefault()
  }

  handleChangeCategory = event => {
    this.setState({categoryValue: event.target.value})
  }

  render() {
    const categoryArr = this.props.allCategories
    if (categoryArr.length > 0) {
      categoryArr.forEach(function(category) {
        category.checked = false
      })
    }
    console.log('checked', categoryArr)
    const {handleSubmit} = this.props
    if(!categoryArr.length > 0) {
      return <h1>Loading</h1>
    }
    return (
      <div>
        <h1>Add New Product</h1>
        <div>
          <form onSubmit={event => handleSubmit(event)}>
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
    handleSubmit(event) {
      event.preventDefault()
      const newProductData = {
        title: event.target.title.value,
        description: event.target.description.value,
        price: event.target.price.value,
        stock: event.target.stock.value,
        imageUrl: event.target.imageUrl.value.split(' ')
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
