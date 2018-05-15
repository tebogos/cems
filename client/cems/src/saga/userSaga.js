import { takeLatest, call, put,all } from "redux-saga/effects";
import axios from "axios";
import "babel-polyfill";
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
  // const  baseUrl = process.env.REACT_APP_BASE_URL
  import {baseUrl} from '../../baseUrl';


const assignUserUrl=`${baseUrl}/process-defination/assign-first-task-to-user`;
// watcher saga: watches for actions dispatched to the store, starts worker saga
export const userSaga=
     [
         takeLatest("POST_ASSIGN_USER",postAssignUser),
        
      ];

 
 
 






// getTaskCommentsWorker saga: makes the api call when watcher saga sees the action
function* postAssignUser(action) {
  try {  

    const task ={
        taskId:action.payload.taskId,
        userId:action.payload.userId,
        processInstanceId:action.payload.processInstanceId
        }
    
   
    const response = yield call(axios.post,assignUserUrl,task);
    const res = response.data;
   console.log("responce ...",res);
    // dispatch a success action to the store with the new dog
    yield put({ type: "SHOW_MESSAGE",payload:"User successfuly assigned" });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE",payload: error });
  }
}
