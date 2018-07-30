import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleOrderItems } from '../store';
import {Link} from 'react-router-dom'

class AdminEditOrder extends React.Component {
	async componentDidMount() {
		await this.props.getOrderProducts(this.props.match.params.id)
	}

	render() {
		console.log(this.props)
		if(this.props.orderItems === undefined) {
			return <h1>Loading</h1>
		}
		else if(this.props.orderItems.length === 0) {
			return <h1>There are no order items associated with this order</h1>
		}
		else {
			return (
				<div>
					<h1>Status: {this.props.orderItems[0].order.status}</h1>
					{this.props.orderItems.map(item => {
						return (
							<div key={item.id}>
							<Link to={`/products/${item.product.id}`}>{item.product.title}</Link>
							<p >quantity:{item.quantity} price: {item.fixedPrice}</p>
							</div>
						)
					})}
				</div>
			)
		}
	}
}


const mapState = state => {
	return {
		orderItems: state.orders.items
	}
}

const mapDispatch = dispatch => {
	return {
		getOrderProducts: id => {
			dispatch(fetchSingleOrderItems(id))
		}
	}
}

export default connect(mapState, mapDispatch)(AdminEditOrder)
