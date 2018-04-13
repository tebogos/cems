import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import {responseGoogle,redirectTo,loginAction} from '../../../reducers/login';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {Redirect,withRouter,Switch} from 'react-router-dom';

class Login extends Component {

  constructor (props){
    super(props);
  
    this.state = {
      redirectToReferrer: false
    }
    this.responseGoogle = this.responseGoogle.bind(this);
    this.login=this.login.bind(this);
  
  }

  
  login(){
    console.log("in login redirectToReferrer ");
    
      this.setState(() => ({
        redirectToReferrer: true
      }));
      // this.props.redirectTo('/#/dashbaord');
      
     
  }
  responseGoogle(responce){
    console.log("In local responseGoogle did mont");
     this.props.responseGoogle(responce);
    this.login();
    
  }
  componentWillReceiveProps(nextProps) {
// console.log("this.props.authenticated --OO-- ",this.props.authenticated);

    if(nextProps.authenticated==="yes"){
      this.setState(() => ({
        redirectToReferrer: true
      }));
    }
    // this.forceUpdate();
  }
  render() {
    
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;
    console.log("in this.props.location.state || --> ",this.props.location.state);

    if (redirectToReferrer === true) {
      console.log("in redirectToReferrer from --> ",from);
      return <Redirect to={from} />
    // this.props.redirectTo('/');
        // document.location.reload();
    // const {history}=this.props;
        
    }
    
    return (
     
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    
                   
                    <Row>
                      <Col xs="6">
                      <GoogleLogin
    clientId="284340047653-gga223ssl5g5t7md5qqguhkiki2pprq3.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    redirectUri={"/dashboard"}
  />
                      </Col>
                      
                    </Row>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default withRouter( connect(
  (state) => ({authenticated: state.login.authenticated}),
  {responseGoogle,redirectTo,loginAction}
)(Login))