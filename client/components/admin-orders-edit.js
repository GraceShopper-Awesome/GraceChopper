import React from 'react'
import {connect} from 'react-redux'
import { fetchSingleOrderItems, changeOrderStatus } from '../store';
import {Link} from 'react-router-dom'

class AdminEditOrder extends React.Component {
	async componentDidMount() {
		await this.props.getOrderProducts(this.props.match.params.id)
	}

	handleChange = (event) => {
		this.props.changeStatus(event.target.value, this.props.match.params.id)
	}

	render() {
		if(this.props.orderItems === undefined) {
			return <h1>Loading</h1>
		}
		else if(this.props.orderItems.length === 0) {
			return <h1>There are no order items associated with this order</h1>
		}
		else {
			return (
				<div>
					<label>Status:</label>
					<select value={this.props.currentStatus} onChange={event => this.handleChange(event)}>
						<option value="created">Created</option>
						<option value="processing">Processing</option>
						<option value="cancelled">Cancelled</option>
						<option value="completed">Completed</option>
					</select>
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
		orderItems: state.orders.items,
		currentStatus: state.orders.status
	}
}

const mapDispatch = dispatch => {
	return {
		getOrderProducts: id => {
			dispatch(fetchSingleOrderItems(id))
		},
		changeStatus: (status, id) => {
			dispatch(changeOrderStatus(status, id))
		}
	}
}

export default connect(mapState, mapDispatch)(AdminEditOrder)
