import React, {Component} from 'react';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import PrivateRoute from '../PrivateRoute';
import AdminPrivateRoute from '../AdminPrivateRoute';
import SeniorAgentPrivateRoute from '../SeniorAgentPrivateRoute';



import StartProcess from '../../views/Process/StartProcess';
import MyTasksApp from '../../views/Tasks/MyTasksApp';
import Dashboard from '../../views/Dashboard/';

import Colors from '../../views/Theme/Colors/';
import Typography from '../../views/Theme/Typography/';

import UnassignedTaskApp from '../../views/Tasks/UnassignedTaskApp';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Base
import Login from '../../views/Pages/Login/'
import Cards from '../../views/Base/Cards/';
import Forms from '../../views/Base/Forms/';
import Switches from '../../views/Base/Switches/';
import Tables from '../../views/Base/Tables/';
import Tabs from '../../views/Base/Tabs/';
import Breadcrumbs from '../../views/Base/Breadcrumbs/';
import Carousels from '../../views/Base/Carousels/';
import Collapses from '../../views/Base/Collapses/';
import Dropdowns from '../../views/Base/Dropdowns/';
import Jumbotrons from '../../views/Base/Jumbotrons/';
import ListGroups from '../../views/Base/ListGroups/';
import Navbars from '../../views/Base/Navbars/';
import Navs from '../../views/Base/Navs/';
import Paginations from '../../views/Base/Paginations/';
import Popovers from '../../views/Base/Popovers/';
import ProgressBar from '../../views/Base/ProgressBar/';
import Tooltips from '../../views/Base/Tooltips/';

// Buttons
import Buttons from '../../views/Buttons/Buttons/';
import ButtonDropdowns from '../../views/Buttons/ButtonDropdowns/';
import ButtonGroups from '../../views/Buttons/ButtonGroups/';
import SocialButtons from '../../views/Buttons/SocialButtons/';

// Icons
import Flags from '../../views/Icons/Flags/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';

// Notifications
import Alerts from '../../views/Notifications/Alerts/';
import Badges from '../../views/Notifications/Badges/';
import Modals from '../../views/Notifications/Modals/';

import jwtDecode from 'jwt-decode';
import {loginAction,logoutAction} from '../../reducers/login';
import Snackbar from 'material-ui/Snackbar';


class Full extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      assign:false,
      open:false,
      message:"",
      messageInitiated:false
    };

    this.handleRequestClose=this.handleRequestClose.bind(this);
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  }
  componentWillReceiveProps(nextProp){
   console.log("next props <<<---->>> ",nextProp);
   
    if(nextProp){
     if(nextProp.message){
        this.setState({
          open: true,
          message:nextProp.message         
        }); 
        this.props.resetMessage();
      }
    }
  }
  
  componentDidMount() {
   

let expired=false;
console.log("in Full componentDidMount -- process.env.NODE_ENV ",process.env.NODE_ENV);

if(window.localStorage.getItem('token')){

const token=window.localStorage.getItem('token');
const tokenDecoded=jwtDecode(token);
const tokenExpeiry= tokenDecoded.exp;
console.log("tokenDecoded --> ",tokenDecoded);
console.log("tokenExpeirym --> ",tokenExpeiry);
console.log("Date time now --> ",(new Date().getTime()))
console.log("tokenExpeiry-86300000 --> ",(tokenExpeiry-86300000));
//  expired = (tokenExpeiry-84000000)<(new Date().getTime());
 expired = (tokenExpeiry)<(new Date().getTime());
console.log("expired --> ",expired);
if(expired){
  console.log("loggin ou now");;
  
  this.props.logoutAction('no');
}

}
  }

  render() {
    console.log(" this.props.role --> ||--> |||||| ",process.env.NODE_ENV);
    console.log("in Full componentDidMount -- process.env.NODE_ENV ",process.env.NODE_ENV);
    
    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>              
                <PrivateRoute path="/dashboard" authenticated={this.props.authenticated} name="Dashboard" component={Dashboard}/>
                <PrivateRoute path="/my-tasks" authenticated={this.props.authenticated} name="MyTasks" component={MyTasksApp}/>
                <Route exact path="/login"  name="Login Page" component={Login}/>
                <SeniorAgentPrivateRoute path="/unassigned-tasks" role={this.props.role} authenticated={this.props.authenticated} name="UnassignedTasks" component={UnassignedTaskApp}/>
                <AdminPrivateRoute role={this.props.role} authenticated={this.props.authenticated} path="/theme/colors" name="Colors" component={Colors}/>
                <PrivateRoute path="/start-process" authenticated={this.props.authenticated} name="StartProcess" component={StartProcess}/>
                <Route path="/theme/typography" name="Typography" component={Typography}/>
                <Route path="/base/cards" name="Cards" component={Cards}/>
                <Route path="/base/forms" name="Forms" component={Forms}/>
                <Route path="/base/switches" name="Swithces" component={Switches}/>
                <Route path="/base/tables" name="Tables" component={Tables}/>
                <Route path="/base/tabs" name="Tabs" component={Tabs}/>
                <Route path="/base/breadcrumbs" name="Breadcrumbs" component={Breadcrumbs}/>
                <Route path="/base/carousels" name="Carousels" component={Carousels}/>
                <Route path="/base/collapses" name="Collapses" component={Collapses}/>
                <Route path="/base/dropdowns" name="Dropdowns" component={Dropdowns}/>
                <Route path="/base/jumbotrons" name="Jumbotrons" component={Jumbotrons}/>
                <Route path="/base/list-groups" name="ListGroups" component={ListGroups}/>
                <Route path="/base/navbars" name="Navbars" component={Navbars}/>
                <Route path="/base/navs" name="Navs" component={Navs}/>
                <Route path="/base/paginations" name="Paginations" component={Paginations}/>
                <Route path="/base/popovers" name="Popovers" component={Popovers}/>
                <Route path="/base/progress-bar" name="Progress Bar" component={ProgressBar}/>
                <Route path="/base/tooltips" name="Tooltips" component={Tooltips}/>
                <Route path="/buttons/buttons" name="Buttons" component={Buttons}/>
                <Route path="/buttons/button-dropdowns" name="ButtonDropdowns" component={ButtonDropdowns}/>
                <Route path="/buttons/button-groups" name="ButtonGroups" component={ButtonGroups}/>
                <Route path="/buttons/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/icons/flags" name="Flags" component={Flags}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/notifications/alerts" name="Alerts" component={Alerts}/>
                <Route path="/notifications/badges" name="Badges" component={Badges}/>
                <Route path="/notifications/modals" name="Modals" component={Modals}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>                
                <Redirect from="/" to="/dashboard"/>
              </Switch>
              <Snackbar
 open={this.state.open}
 message={this.state.message}
 autoHideDuration={4000}
 onRequestClose={this.handleRequestClose}
/>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
   
  return {
    loginAction: (login) => dispatch({ type: "GET_TASK_COMMETS" ,payload:{authenticated:login}}),
    logoutAction: (login) => dispatch({ type: "GET_MY_TASKS",payload:{authenticated:login} }),
    resetMessage:()=>dispatch({type:"RESET_MESSAGE"}),

  };
  
};
export default withRouter( connect((state) => ({authenticated: state.login.authenticated,
  redirectUrl: state.login.redirectUrl,role:state.login.role,
message:state.message}),mapDispatchToProps
)(Full))