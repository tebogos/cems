import { takeLatest, call, put,all } from "redux-saga/effects";
import axios from "axios";
import "babel-polyfill";

const getDefinitionsUrl='${baseUrl}/process-defination/start-process';
const getTaskCommentsUrl='${baseUrl}/tasks/task-comments?taskId=';
const getMyTasksUrl='${baseUrl}/process-defination/get-my-tasks?userId=';
const getAllProcessUsersUrl='${baseUrl}/process-defination/get-all-users';
const postAddNoteUrl='${baseUrl}/tasks/add-task-note';
// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield all([
        yield takeLatest("GET_DIFINITIONS", definitionsWorker),
        yield takeLatest("GET_TASK_COMMETS",getTaskCommentsWorker),
        yield takeLatest("GET_MY_TASKS",getMyTasksWorker),
        yield takeLatest("GET_ALL_PROCESS_USERS",getAllProcessUsersWorker),
        yield takeLatest("POST_ADD_NOTE_FORM",postAddNoteForm)
        
      ])

 
 
 
}

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

// postAddNoteForm saga: makes the api call when watcher saga sees the action
function* postAddNoteForm(action) {
    try {
        const form=action.payload;
      const response = yield call(axios.post(postAddNoteUrl,form));
      const status = response.data;      
  
      // dispatch a success action to the store with the new dog
      yield put({ type: "GET_TASK_COMMETS",payload: form.taskId });
    
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
// getTasksWorker saga: makes the api call when watcher saga sees the action
function* getMyTasksWorker(action) {
    try {

        const url=getMyTasksUrl+"tebogos@gmail.com";
        console.log("loading taskId   url...",url);
      const response = yield call(axios.get,url);
      const tasks = response.data;
    
     const taskWithVar= tasks.tasks._embedded.task.map(task=>{
        console.log(" Task|....| --->",taskWithVar);
        
        return ({id:task.id,
        name:task.name,
        assignee:task.assignee,
        created:task.created,
        due:task.due,
        followUp:task.followUp,
        delegationState:task.delegationState,
        description:task.description,
        executionId:task.executionId,
        owner:task.owner,
        parentTaskId:task.parentTaskId,
        priority:task.priority,
        processDefinitionId:task.processDefinitionId,
        processInstanceId:task.processInstanceId,     
        taskDefinitionKey:task.taskDefinitionKey,
        isComplete:false,
        firmFound:tasks.variables.filter(vr=>vr.name==="firmFound").map(vr=>vr.value),
        businessKey:tasks.variables.filter(vr=>vr.name==="businessKey").map(vr=>vr.value)
        })     
      })
      console.log("tasks in saga **********888888******",taskWithVar);
      
      // dispatch a success action to the store with the new dog
      yield put({ type: "LOAD_TASKS",payload: taskWithVar });
    
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: "API_CALL_FAILURE",payload: error });
    }
  }
  
