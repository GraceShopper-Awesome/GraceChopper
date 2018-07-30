import React from 'react'
import {connect} from 'react-redux'
import {singleProduct, addToCart} from '../store'

class ProductSingle extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getProduct(id)
  }

  handleClick(evt) {
    evt.preventDefault()
    this.props.addAProduct(this.props.product)
  }

  handleReview() {
    const {id} = this.props.match.params
    this.props.history.push(`/products/${id}/review`)
  }

  render() {
    console.log('this.props.product', this.props)
    if (!this.props.product.length) {
      return <h1>Loading</h1>
    } else {
      const {
        title,
        description,
        price,
        imageUrl,
        stock,
        id
      } = this.props.product[0]

      const reviewsArr = this.props.product[0].reviews
      const rating = productRating(reviewsArr)

      return (
        <div>
          <div>
            <div id="productSingle">
              <h1>Product Name: {title}</h1>
              <p>Description: {description}</p>
              <h2>Price: {price}</h2>
              <h3>Stock: {stock}</h3>
              {imageUrl &&
                imageUrl.length &&
                imageUrl.map(el => <img key={id} src={el} />)}
            </div>
            <button type="button" onClick={evt => this.handleClick(evt)}>
              ADD TO CART!
            </button>
          </div>
          <div>
            <h1>Customer Reviews</h1>
            <h2>
              {rating
                ? `Rating: ${rating} Stars`
                : 'Be the first to leave a review'}
            </h2>
            <button type="button" onClick={this.handleReview}>
              Leave A Review
            </button>
            <div className="reviewList">
              <table>
                <tr>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
                {reviewsArr.map(el => (
                  <tr className="singleReview" key={el.id}>
                    <td>{el.rating}</td>
                    <td>{el.content}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      )
    }
  }
}

function productRating(arr) {
  let rating = 0
  let sum = 0
  if (arr.length === 0) {
    rating = 0
  } else {
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].rating
    }
    rating = Math.ceil(sum / arr.length)
  }
  return rating
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.products.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(singleProduct(id)),
    addAProduct: product => dispatch(addToCart(product))
  }
}

export default connect(mapState, mapDispatch)(ProductSingle)
