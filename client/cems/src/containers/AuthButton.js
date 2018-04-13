
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {withRouter} from 'react-router-dom';
import {signout} from '../reducers/login';



class AuthButton extends Component {
render(){
  const signout=(cb)=>{
    this.props.signout();
    setTimeout(cb, 100);
  }
  const { match, location, history } = this.props
 return this.props.isLoggedIn ? (
    <p>
      Welcome! <button onClick={() => {
        signout(() => history.push('/'))
       
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )

  }
}
  
  export default withRouter(connect(
    (state) => ({isLoggedIn: state.login.isLoggedIn},{signout}))(AuthButton))