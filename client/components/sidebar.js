import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchAllCategories } from '../store';

class Sidebar extends Component {
	componentDidMount() {
		this.props.fetchAllCategories();
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<h1>SIDEBAR</h1>
				{
					this.props.allCategories.map((category) => (
					<div key={category.id}>
						<p>{category.name}</p>
					</div>
					))
				}
			</div>
		)
	}
}

const mapState = state => {
	return {
		allCategories: state.categories
	}
}

const mapDispatch = dispatch => {
	return {
		fetchAllCategories: () => {
			dispatch(fetchAllCategories())
		}
	}
}

export default connect(mapState, mapDispatch)(Sidebar)

