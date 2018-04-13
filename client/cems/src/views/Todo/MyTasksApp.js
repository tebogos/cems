import React, { Component } from 'react';
import {BrowserRouter as Router, Route,withRouter} from 'react-router-dom';
import TodoForm from './TodoForm';
import MyTasks from './MyTasks';
import Message from './Message';
import Footer from './Footer';
import TodoDetails from './TodoDetails';
import {loginAction,logoutAction} from '../../reducers/login';
import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBody, Label, Input} from 'reactstrap';
import jwtDecode from 'jwt-decode';
import {connect} from 'react-redux';

class MyTasks extends Component {

  componentDidMount()
 {
    let expired=false;
console.log("in Full componentDidMount -- ");

if(window.localStorage.getItem('token')){

const token=window.localStorage.getItem('token');
const tokenDecoded=jwtDecode(token);
const tokenExpeiry= tokenDecoded.exp;
console.log("tokenDecoded --> ",tokenDecoded);
console.log("tokenExpeirym --> ",tokenExpeiry);
console.log("Date time now --> ",(new Date().getTime()))
console.log("tokenExpeiry-86300000 --> ",(tokenExpeiry-86300000));
 expired = (tokenExpeiry-86300000)<(new Date().getTime());
console.log("expired --> ",expired);
if(expired){
  console.log("loggin ou now");
  
  this.props.logoutAction('no');
}

}
  }

    render() {
        return (
 <Router>
 <div className="Todo-App">
 <Card>
              <CardHeader>
                My Tasks
              </CardHeader>
              <CardBody>
              <Message />
   {/* <TodoForm /> */}
   
   <Route path='/:filter?' render={({match}) => (
       <MyTasks filter={match.params.filter} />
     )} />
   {/* <Footer /> */}
  
 
              </CardBody>
            </Card>
 </div>
</Router>

    )
}
}


export default withRouter( connect((state) => ({authenticated: state.login.authenticated,redirectUrl: state.login.redirectUrl}),{loginAction,logoutAction}
)(MyTasks))