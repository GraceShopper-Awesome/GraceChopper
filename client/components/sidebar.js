import React, {Component} from 'react'
import { connect } from 'react-redux';
import { fetchAllCategories, toggleCategory } from '../store';

class Sidebar extends Component {
	componentDidMount() {
		this.props.fetchAllCategories();
	}
	render() {
		return (
			<div>
				<h1>SIDEBAR</h1>
				<form>
				{
					this.props.allCategories.map((category) => (
					<div key={category.id}>
						<input
							type="checkbox"
							value={category.id}
							onChange={() => this.props.selectCategory(category)}
						/>
						{category.name}
					</div>
					))
				}
				</form>
			</div>
		)
	}
}

const mapState = state => {
	return {
		allCategories: state.categories.all
	}
}

const mapDispatch = dispatch => {
	return {
		fetchAllCategories: () => {
			dispatch(fetchAllCategories())
		},
		selectCategory: category => {
			dispatch(toggleCategory(category))
		}
	}
}

export default connect(mapState, mapDispatch)(Sidebar)

