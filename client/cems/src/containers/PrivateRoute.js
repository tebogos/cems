
import React from 'react'
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const PrivateRoute = ({ component: Component,authenticated , ...rest }) => (
    <Route {...rest} render={(props) => (
      authenticated === "yes"
        ? <Component  />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  )

  
  export default PrivateRoute
  // connect(
  //   (state) => ({isLoggedIn: state.login.isLoggedIn},{pure: false}))(PrivateRoute)