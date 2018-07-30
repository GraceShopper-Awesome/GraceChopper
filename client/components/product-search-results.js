import React from 'react'
import {connect} from 'react-redux'
import {products} from '../store/products'
import {Link} from 'react-router-dom'
// import Sidebar from './sidebar'

class ProductSearchResults extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    if (!this.props.products.searchResults.results.length) {
      return <h1>No results found</h1>
    } else {
      const searchTerm = this.props.products.searchResults.searchTerm
      return (
        <div id="container">
          <h2>Showing search results for "{searchTerm}"</h2>
          {this.props.products.searchResults.results.map(elements => (
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
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(products())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductSearchResults
)
