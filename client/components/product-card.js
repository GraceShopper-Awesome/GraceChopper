import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
	const {id, title, price, stock, imageUrl} = props;
	return (
		<div>
			<Link to={`products/${id}`}>
				<h1>{title}</h1>
				<div>
					{imageUrl && imageUrl.length && (<img src={imageUrl[0]} />)}
				</div>
			</Link>
			<h3>${price}</h3>
			<h3>{stock} in stock</h3>
		</div>
	)
}

export default ProductCard
