import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllCategories, toggleCategory} from '../store'

class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchAllCategories()
  }
  render() {
    return (
      <div id="sidebar">
        <h1>Filters</h1>
        <h3>
          <form>
            {this.props.allCategories.map(category => (
              <div key={category.id}>
                <input
                  id="categories"
                  type="checkbox"
                  value={category.id}
                  onChange={() => this.props.selectCategory(category)}
                />
                {category.name}
              </div>
            ))}
          </form>
        </h3>
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
