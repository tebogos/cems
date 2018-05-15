import { takeLatest, call, put,all } from "redux-saga/effects";
import axios from "axios";
import "babel-polyfill";
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
  // const  baseUrl = process.env.REACT_APP_BASE_URL
  import {baseUrl} from '../../baseUrl';


const getDefinitionsUrl=`${baseUrl}/process-defination/start-process`;
const getAllProcessUsersUrl=`${baseUrl}/process-defination/get-all-users`;
// watcher saga: watches for actions dispatched to the store, starts worker saga
export const processSaga=
   [
         takeLatest("GET_DIFINITIONS", definitionsWorker),
         takeLatest("GET_ALL_PROCESS_USERS",getAllProcessUsersWorker),
              ];

 
 
 


// function that makes the api request and returns a Promise for response
// function fetchDefinitions() {
//   return axios({
//     method: "get",
//     url: '${baseUrl}/process-defination/start-process'
//   });
// }

// worker saga: makes the api call when watcher saga sees the action
function* definitionsWorker(action) {
  try {
    const response = yield call(axios.get,getDefinitionsUrl);
    const definitions = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: "LOAD_DIFINITIONS",payload: definitions });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE",payload: error });
  }
}


function* getAllProcessUsersWorker(action) {
    try {
      const response = yield call(axios.get,getAllProcessUsersUrl);
      const users = response.data;
      const modUsers= users.map(user=>{      
        return{userId:user.id,name:user.firstName}
      });
      // dispatch a success action to the store with the new dog
      yield put({ type: "LOAD_PROCESS_USERS",payload: modUsers });
    
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: "API_CALL_FAILURE",payload: error });
    }
  }

