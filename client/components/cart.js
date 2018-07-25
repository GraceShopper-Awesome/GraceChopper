import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class Cart extends React.Component {
    componentDidMount() {
        console.log("HIIIIIIIIIIII")
    }



    render(){
        console.log("This.props.cart", this.props.cart)
        return(
        <div>
            <p>hello</p>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      cart: state.cart
    }
  }

export default connect(mapStateToProps)(Cart)