import React from 'react'
import {connect} from 'react-redux'
import {singleProduct, addCartItem, getCart} from '../store'

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

  async handleClick(evt) {
    try {
      evt.preventDefault()
      await this.props.addAProduct(this.props.user.id, this.props.product.id, 1)
      await this.props.getFromCart(this.props.user.id)
    } catch (err) {
      console.error(err)
    }
  }

  handleReview() {
    const {id} = this.props.match.params
    this.props.history.push(`/products/${id}/review`)
  }

  render() {
    if (!this.props.product) {
      return <h1>Loading</h1>
    } else {
      const {
        title,
        description,
        price,
        imageUrl,
        stock,
        id
      } = this.props.product

      const reviewsArr = this.props.product.reviews
      const rating = productRating(reviewsArr)
      return (
        <div className="productSingleContainer">
          <div className="productSingleView">
            <h1 id="headerMargin">{title}</h1>
            <h4>{description}</h4>
            <h2>${price}</h2>
            {/* <h3>Remaining: {stock}</h3> */}
            <div className="addToCartandImage">
              {imageUrl &&
                imageUrl.length &&
                imageUrl.map(el => (
                  <img id="singleProductImage" key={id} src={el} />
                ))}
              <button id="addToCart" onClick={this.handleClick}>
                Add To Cart
              </button>
            </div>
          </div>
          <div className="reviews">
            <h1 id="headerMargin">Customer Reviews</h1>
            <h2>
              {rating
                ? `Rating: ${rating} Stars`
                : 'Be the first to leave a review'}
            </h2>
            <button type="button" onClick={this.handleReview}>
              Leave A Review
            </button>
            <div className="reviewList">
              <table id="reviewTable" align="center">
                <thead>
                  <tr>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewsArr.map(el => (
                    <tr className="singleReview" key={el.id}>
                      <td id="reviewRating">{el.rating}</td>
                      <td>{el.content}</td>
                    </tr>
                  ))}
                </tbody>
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
    user: state.user,
    product: state.products.product
  }
}

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(singleProduct(id)),
    addAProduct: (userId, productId, quantity) =>
      dispatch(addCartItem(userId, productId, quantity)),
    getFromCart: id => dispatch(getCart(id))
  }
}

export default connect(mapState, mapDispatch)(ProductSingle)
