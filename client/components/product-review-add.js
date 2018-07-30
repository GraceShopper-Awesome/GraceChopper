// import React from 'react'
// import {products, addNewProduct} from '../store/products'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {addReview} from '../store'

// class ProductAddReview extends React.Component {
//   constructor() {
//     super()
//     // this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit = event => {
//     console.log('in handle submit')
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="title">Product Title</label>
//           <input type="text" id="title" name="title" />
//           <button type="submit">Leave Review</button>
//         </form>
//       </div>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   add: reviewData => dispatch(addReview(reviewData))
// })

// export default connect(null, mapDispatchToProps)(ProductAddReview)
