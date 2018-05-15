import { takeLatest, call, put,all } from "redux-saga/effects";
import axios from "axios";
import "babel-polyfill";
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
//  const   baseUrl = process.env.REACT_APP_BASE_URL
import {baseUrl} from '../../baseUrl';


const postAddNoteUrl=`${baseUrl}/tasks/add-task-note`;
// watcher saga: watches for actions dispatched to the store, starts worker saga
export  const addNoteSaga=[
         takeLatest("POST_ADD_NOTE_FORM",postAddNoteForm)
        
      ];

 
 
 

// postAddNoteForm saga: makes the api call when watcher saga sees the action
function* postAddNoteForm(action) {
    try {
        const form=action.payload;
      const response = yield call(axios.post(postAddNoteUrl,form));
     
      
     
      
      // dispatch a success action to the store with the new dog
    //   yield put({ type: "GET_TASK_COMMETS",payload: form.taskId });

      yield put({type:"SHOW_MESSAGE",payload:"Note successfuly added"});
    
    
    
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: "API_CALL_FAILURE",payload: error });
    }
  }


// getTaskCommentsWorker saga: makes the api call when watcher saga sees the action
function* getTaskCommentsWorker(action) {
  try {  

    const url =getTaskCommentsUrl+action.payload;
   
    const response = yield call(axios.get,url);
    const commentsDotComment = response.data;
   console.log("comments ...",commentsDotComment);
   const comments=commentsDotComment['comments'];
   console.log("comments 2 ...",comments);
    // dispatch a success action to the store with the new dog
    yield put({ type: "LOAD_TASK_COMMETS",payload: comments });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE",payload: error });
  }
}
