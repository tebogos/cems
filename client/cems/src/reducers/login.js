import {httpLoginUser} from '../lib/loginServices';
import {showMessage} from './messages';
import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';


const initState = {
  username:'' ,
  imageUrl:'',    
  redirectUrl:'/',
  authenticated:'no',
  region:"",
  role:['']
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATEUSER='UPDATEUSER';

export const redirectTo=(url)=>{
  return (dispatch)=>{
    dispatch(push(url))}
};
export const responseGoogle = (response) => {
  console.log(response);
 return loginUser(response.accessToken);
 

}
export const loginAction =(login)=>{
  return (dispatch)=>dispatch(loginAct(login));
}
export const logoutAction =(logout)=>{
  return (dispatch)=>dispatch(logoutAct(logout));
}
export const loginAct = (login) => ({type:LOGIN, payload:  {authenticated:login}});
export const updateUserAction = (user) => ({type:UPDATEUSER, payload: user});
export const logoutAct = (logout) => ({type: LOGOUT, payload: {authenticated:logout}});
const boundLoginAction = user =>{ dispatch(loginAction(user))}

export const loginUser = (accessToken) => {
  return (dispatch) => {
    dispatch(showMessage('Loging in...'))
    return httpLoginUser(accessToken)
    .then(user =>{
        console.log(user);
        const decoded = jwtDecode(user.token);
        console.log(decoded)
       window.localStorage.setItem("token",user.token);
      //  window.location = "${baseUrl}/#/dashboard";
      //  dispatch(push('/dashboard'))
      // browserHistory.push('/dashboard')
      // window.location.href = '${baseUrl}/#/dashboard';
      // dispatch(push('/dashboard'))
      // browserHistory.push('/dashboard')
      
       console.log("we are logging here <<<<----->>>> region = ",user.region);
       
       dispatch(loginAction({authenticated:"yes"}));
       dispatch(updateUserAction({username:user.usename,imageUrl:user.usename,role:user.role,region:user.region}));
      //  document.location.href='/Todo';
      });
  }
}




const updateUser=(state,action)=>Object.assign({},state,action.payload)
const logout =(state,action)=>Object.assign({},state,{authenticated:'no'})
const login=(state,action)=>Object.assign({},state,{authenticated:'yes'})

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return login(state,action)
    case LOGOUT:
      return logout(state,action)
    case UPDATEUSER:
      return updateUser(state,action)
      
    default:
      return state
  }
}
