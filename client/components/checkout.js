import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { cart, products, me } from '../store'




class Checkout extends React.Component {

    componentDidMount(){
        this.props.getUser();
    }

    render(){
        console.log("this.props", this.props)
        const {user} = this.props
        const {email} = user
        let username;
        if(email){
            username = email.slice(0,email.indexOf("@"))
        } else username = "guest"
        if(username){
            return(
            <div>
                <h1>{username}'s Cart</h1>
            </div>
            )
        } else return <h1>Loading</h1>
    }

}



const mapStateToProps = state => {
    return {
      cart: state.cart,
      user: state.user,
    }
  }

const mapDispatchToProps = dispatch => {
    return  {
        getProduct : () => dispatch(products()),
        getUser : () => dispatch(me())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)