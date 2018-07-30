import React from 'react'
import {connect} from 'react-redux'
import {products, searchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import Sidebar from './sidebar'

class ProductAll extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {handleSearch} = this.props
    if (!this.props.products.length) {
      console.log(this.props)
      return <h1>Loading</h1>
    } else {
      const {activeCategories} = this.props
      let visibleProducts = this.props.products
      if (activeCategories.length !== 0) {
        visibleProducts = this.props.products.filter(product => {
          return activeCategories.every(tag => {
            return product.categories
              .map(cat => {
                return cat.id
              })
              .includes(tag)
          })
        })
      }

      return (
        <div id="container">
          <Sidebar />
          <form className="searchBar" onSubmit={event => handleSearch(event)}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search for product"
            />
            <button type="submit" id="searchButton">
              Search
            </button>
          </form>
          {visibleProducts.map(elements => (
            <div key={elements.id} id="singleProd">
              <div id="maininfo">
                <Link to={`/products/${elements.id}`}>
                  <h1>{elements.title}</h1>
                </Link>
                <h3>${elements.price}</h3>
                <h3>{elements.stock} in stock</h3>
                {elements.imageUrl &&
                  elements.imageUrl.length && (
                    <img src={elements.imageUrl[0]} />
                  )}
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    activeCategories: state.categories.active
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSearch(event) {
      event.preventDefault()
      dispatch(searchProducts(event.target.search.value, ownProps.history))
    },
    fetchProducts: () => {
      dispatch(products())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll)
