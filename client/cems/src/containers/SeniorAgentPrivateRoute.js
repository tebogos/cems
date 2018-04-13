
import React from 'react'
import {connect} from 'react-redux';
import YouAreNotAuthorised from './YouAreNotAuthorised';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const SeniorAgentPrivateRoute = ({ component: Component,authenticated,role , ...rest }) => (
    <Route {...rest} render={(props) => (
      authenticated === "yes"  
        ? (role.includes("senior-agent") ? <Component  />: <YouAreNotAuthorised />):(role.includes("senior-agent")?<Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />)
    )} />
  )

  
  export default SeniorAgentPrivateRoute
  // connect(
  //   (state) => ({isLoggedIn: state.login.isLoggedIn},{pure: false}))(PrivateRoute)