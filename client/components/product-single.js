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
    evt.preventDefault()
    await this.props.addAProduct(this.props.user.id, this.props.product.id, 1)
    await this.props.getFromCart(this.props.user.id)
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
        <div>
          <div id="productSingle">
            <h1>Product Name: {title}</h1>
            <p>Description: {description}</p>
            <h2>Price: {price}</h2>
            <h3>Stock: {stock}</h3>
            {imageUrl &&
              imageUrl.length &&
              imageUrl.map(el => <img key={id} src={el} />)}
            <button onClick={this.handleClick}>Add To Cart</button>
          </div>
          <div>
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
                <tbody>
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
