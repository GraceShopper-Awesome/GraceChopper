import React from 'react'
import {addReview} from '../store/products'
import {connect} from 'react-redux'

class ProductAddReview extends React.Component {
  constructor() {
    super()
  }

  handleSubmit = event => {
    event.preventDefault()
    const reviewData = {
      content: event.target.reviewContent.value,
      rating: event.target.dropdown.value,
      productId: Number(this.props.match.params.id),
      userId: this.props.user.id
    }
    this.props.add(reviewData)
    this.props.history.push(`/products/${this.props.product.id}`)
  }

  render() {
    if (!this.props.user.id) {
      return <h1>Please sign in or sign up to leave a product review</h1>
    } else {
      return (
        <div className="addReviewPage">
          <h2 id="headerMargin">
            Leave a review for: "{this.props.product.title}"
          </h2>
          <img src={this.props.product.imageUrl[0]} />
          <div className="addReview">
            <form onSubmit={this.handleSubmit}>
              <select name="dropdown" id="reviewDropdown">
                <option value="5">5 (Best)</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1 (Worst)</option>
              </select>
              <input
                type="text"
                rows="4"
                className="reviewContent"
                name="reviewContent"
                placeholder="Leave a review..."
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  add: reviewData => dispatch(addReview(reviewData))
})

const mapStateToProps = state => ({
  user: state.user,
  product: state.products.product
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddReview)
