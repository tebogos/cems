import { takeLatest, call, put,all } from "redux-saga/effects";
import axios from "axios";
import "babel-polyfill";
// let baseUrl="";
// if(process.env.NODE_ENV === 'production')
//    baseUrl = process.env.REACT_APP_PROD_BASE_URL
// else
    // baseUrl = process.env.REACT_APP_BASE_URL
    import {baseUrl} from '../../baseUrl';


const getTaskCommentsUrl=`${baseUrl}/tasks/task-comments?taskId=`;
const getMyTasksUrl=`${baseUrl}/process-defination/get-my-tasks?userId=`;
const getUnassignedTasksUrl=`${baseUrl}/process-defination/get-unassigned-tasks?region=`;
// watcher saga: watches for actions dispatched to the store, starts worker saga
export const taskSaga=
     [
         takeLatest("GET_TASK_COMMETS",getTaskCommentsWorker),
         takeLatest("GET_MY_TASKS",getMyTasksWorker),
         takeLatest("GET_UNASSIGNED_TASKS",getUnassignedTasksWorker)
        
      ];

 
 
 






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

        const url=getMyTasksUrl+action.payload;
        console.log("loading taskId   url...",url);
      const response = yield call(axios.get,url);
      const tasks = response.data;
      let taskWithVar=[];
      console.log("respose response.status",response.status);
      if(response.status===204){
         taskWithVar=[];
          // dispatch a no tasks found message
      yield put({ type: "SHOW_MESSAGE",payload: "No Tasks found" });
    }
      else{
       taskWithVar= tasks.tasks._embedded.task.map(task=>{
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
    }
      console.log("tasks in saga **********888888******",taskWithVar);
      
      // dispatch a success action to the store with the new dog
      yield put({ type: "LOAD_TASKS",payload: taskWithVar });
    
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: "API_CALL_FAILURE",payload: error });
    }
  }
  
  function* getUnassignedTasksWorker(action) {
    try {
        
        const url=getUnassignedTasksUrl+action.payload;
        console.log("loading taskId   url...",url);
      const response = yield call(axios.get,url);
      const tasks = response.data;
      let taskWithVar=[];
      console.log("respose response.data.status",response.data.status);
      if(response.status===204){
         taskWithVar=[];
         
         // dispatch a no tasks found message
      yield put({ type: "SHOW_MESSAGE",payload: "No Tasks found" });
    }
      else{
       taskWithVar= tasks.tasks._embedded.task.map(task=>{
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
    }
      console.log("tasks in saga **********888888******",taskWithVar);
      
      // dispatch a success action to the store with the new dog
      yield put({ type: "LOAD_TASKS",payload: taskWithVar });
    
    } catch (error) {
      // dispatch a failure action to the store with the error
      yield put({ type: "API_CALL_FAILURE",payload: error });
    }
  }
  
