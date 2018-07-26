import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class Search extends Component {
	constructor() {
		super()
		this.state = {
			value: ""
		}
	}

	render() {
		return (
			<div>
				<label>Search</label>
				<input type="text" name="search"/>
				<button type="submit">Search</button>
			</div>
		)
	}
}
