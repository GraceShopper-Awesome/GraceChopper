import React, {Component} from 'react'
import {
  fetchAllCategories,
  addCategoryToDatabase,
  removeCategoryFromDatabase
} from '../store'
import {connect} from 'react-redux'

class AdminAddCategory extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    this.props.fetchAllCategories()
  }

  handleSubmit = event => {
    event.preventDefault()
    const name = event.target.categoryName.value
    this.props.addCategory(name)
    this.setState({value: ''})
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  removeCategoryOnClick = (event, id) => {
    event.preventDefault()
    this.props.removeCategory(id)
  }

  render() {
    return (
      <div>
        <h1>Add/Remove Category</h1>
        <ul>
          {this.props.allCategories.map(category => {
            return (
              <div key={category.id}>
                <li>{category.name}</li>
                <button
                  type="button"
                  onClick={event =>
                    this.removeCategoryOnClick(event, category.id)
                  }
                >
                  X
                </button>
              </div>
            )
          })}
        </ul>

        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            value={this.state.value}
            onChange={event => this.handleChange(event)}
            name="categoryName"
          />
          <button type="submit">Add</button>
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
    addCategory: name => {
      dispatch(addCategoryToDatabase(name))
    },
    removeCategory: categoryId => {
      dispatch(removeCategoryFromDatabase(categoryId))
    }
  }
}

export default connect(mapState, mapDispatch)(AdminAddCategory)
