import React from 'react'
import {products, addNewProduct, addReview} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {addReview} from '../store'

class ProductAddReview extends React.Component {
  constructor() {
    super()
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()
    const reviewData = {
      content: event.target.reviewContent.value,
      rating: event.target.dropdown.value,
      productId: Number(this.props.match.params.id),
      userId: this.props.user.id
    }
    console.log('reviewData', reviewData)
    this.props.add(reviewData)
  }

  render() {
    if (!this.props.user.id) {
      return <h1>Please sign in or sign up to leave a product review</h1>
    } else {
      console.log('this.props.user.id', this.props.user.id)
      return (
        <div>
          <h2>Leave a review for: {this.props.product[0].title}</h2>
          <img src={this.props.product[0].imageUrl[0]} />
          <div>
            <form onSubmit={this.handleSubmit}>
              {/* <label htmlFor="title"></label> */}
              <select name="dropdown" id="reviewDropdown">
                <option value="5">5 (Best)</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1 (Worst)</option>
              </select>
              <input
                type="text"
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
