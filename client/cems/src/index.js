import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch,BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import reduxStore from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {logoutAct} from './reducers/login';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/';
import jwtDecode from 'jwt-decode';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({});

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { rootSaga } from "./saga/rootSaga";

const history = createHistory();

const { store, persistor,sagaMiddleware } =reduxStore();
// let expired=false;
// console.log("in index check store -->||--> ",store);

// if(window.localStorage.getItem('token')){

// const token=window.localStorage.getItem('token');
// const tokenDecoded=jwtDecode(token);
// const tokenExpeiry= tokenDecoded.exp;
// console.log("tokenDecoded --> ",tokenDecoded);
// console.log("tokenExpeirym --> ",tokenExpeiry);
// console.log("Date time now --> ",(new Date().getTime()))
// console.log("tokenExpeiry-86300000 --> ",(tokenExpeiry-86300000));
//  expired = (tokenExpeiry-86300000)<(new Date().getTime());
// console.log("expired --> ",expired);
// if(expired){
//  store.dispatch(logoutAct('no'));
// }

// }
// 1522126199359

console.log("We are in root now")


sagaMiddleware.run(rootSaga);
ReactDOM.render((
 
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     <MuiThemeProvider muiTheme={muiTheme} >      
      <ConnectedRouter history={history}>
        <Switch>
         {/* <Route exact path="/login" name="Login Page" component={Login}/> */}
         <Route exact path="/register" name="Register Page" component={Register}/>
         <Route exact path="/404" name="Page 404" component={Page404}/>
         <Route exact path="/500" name="Page 500" component={Page500}/>
         <Route path="/" name="Home" component={Full}/>
        </Switch>
        </ConnectedRouter>
        </MuiThemeProvider>        
      </PersistGate>
    </Provider>
), document.getElementById('root'));
