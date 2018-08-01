import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  const {id, title, price, stock, imageUrl} = props
  return (
    <div className="allProductsBox">
      <Link to={`products/${id}`}>
        <div>
          {imageUrl &&
            imageUrl.length && <img src={imageUrl[0]} className="thumbnail2" />}
        </div>
        <h1 id="allProductTitle">{title}</h1>
        <h3 id="allProductPrice">${price}</h3>
        <h3 id="allProductStock">{stock} in stock</h3>
      </Link>
    </div>
  )
}

export default ProductCard
