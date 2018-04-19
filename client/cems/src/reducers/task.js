import {getFirmsService,getMyTasks,getAllProcessUserService,getTasks,assignUserService, createTask, updateTask, destroyTask,completeTaskService} from '../lib/taskServices'
import {showMessage} from './messages'

const initState = {
  tasks: [],
  userList:[{userId:"demo",name:"Demo"},{userId:"peter",name:"Peter"}],
  selectedTask:{id:"",
  name:"",
  assignee:"",
  created:"",
  due:"",
  followUp:"",
  delegationState:"",
  description:"",
  executionId:"",
  owner:"",
  parentTaskId:"",
  priority:0,
  processDefinitionId:"",
  processInstanceId:"",
  taskDefinitionKey:""
  },
  currenttask: ''
}



export const TASK_ADD = 'TASK_ADD'
export const TASKS_LOAD = 'TASKS_LOAD'
const CURRENT_UPDATE = 'CURRENT_UPDATE'
export const TASK_REPLACE = 'TASK_REPLACE'
export const TASK_REMOVE = 'TASK_REMOVE';
export const LOAD_PROCESS_USERS = 'LOAD_PROCESS_USERS';
export const UPDATE_SELECTED_TASK='UPDATE_SELECTED_TASK';

export const updateCurrent = (val) => ({type:CURRENT_UPDATE, payload: val});
export const loadTasks = (tasks) => ({type: TASKS_LOAD, payload: tasks});
export const loadProcessUsers = (users) => ({type: LOAD_PROCESS_USERS, payload: users})
export const addTask = (task) => ({type: TASK_ADD, payload: task})
export const replaceTask = (task) => ({type: task_REPLACE, payload: task })
export const removeTask = (id) => ({type: TASK_REMOVE, payload: id});
export const updateSelectedTask = (task) => ({type: UPDATE_SELECTED_TASK, payload: task});



// export const getFirms = (searchString) => {
//   console.log("My userID for getMytask request",searchString);
  
//   return (dispatch) => {
//     dispatch(showMessage('Loading Tasks'))
//     getFirmsService(searchString).then(firms=>console.log('<--tasks._embedded.task--> ',firms)||firms.map(firm=>{
//       console.log(" Task|....| --->",firm);
// return( {firm.firmNumber:firm.name})
//     }))
//   }
// }
export const fetchMyTasks = (userId) => {
  console.log("My userID for getMytask request",userId);
  
  return (dispatch) => {
    dispatch(showMessage('Loading Tasks'))
    getMyTasks("tebogos@gmail.com").then(tasks=>console.log('<--tasks._embedded.task--> ',tasks._embedded.task)||tasks._embedded.task.map(task=>{
      console.log(" Task|....| --->",task);
      
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
      isComplete:false
      })
      
      
    }))
      .then(tasks =>console.log(tasks.tasks)||dispatch(loadTasks(tasks)))
  }
}

export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Tasks'))
    getTasks().then(tasks=>console.log('<--tasks._embedded.task--> ',tasks._embedded.task)||tasks._embedded.task.map(task=>{
      console.log(" Task|....| --->",task);
      
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
      isComplete:false
      })
      
      
    }))
      .then(tasks =>console.log(tasks.tasks)||dispatch(loadTasks(tasks)))
  }
}

export const changeSelectedTask=(taskId)=>{
  return (dispatch)=>{
    dispatch(updateSelectedTask(taskId))
  }
}
export const getAllProcessUser = () => {
  return (dispatch) => {
    dispatch(showMessage('Getting all process users'))
    getAllProcessUserService().then(users=>users.map(user=>{      
      return{userId:user.id,name:user.firstName}
    }))
      .then(users =>dispatch(loadProcessUsers(users)))
  }
}

export const saveTask = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Task'))
    createTask(name)
      .then(res => dispatch(addTask(res)))
  }
}


export const assignUser =(data)=>{
 
  // return (dispatch) => {
  //   dispatch(showMessage('User assigned'))
    console.log("assignUser data dot --> ",data)
    const task ={
      taskId:data.taskId,
      userId:data.userId,
      processInstanceId:data.processInstanceId
      }
    assignUserService(task)
      .then(res =>console.log("From update response --> ",res))
  // }
}

  export const completTask = (taskIdid) => {
    return (dispatch, getState) => {
      dispatch(showMessage('Saving task update'))
     
      const task = {
        "taskId":taskId,
        "variables":{
          "workRequestNumber":{"value":"gro254689gf","type":"string"},
          "firmName":{"value":"Denel Aviation","type":"string"}
        }
        }
      completeTaskService(task)
        .then(res =>console.log("From update response --> ",res)||dispatch(replacetask(res)))
    }
  }
// export const toggleTask = (id) => {
//   return (dispatch, getState) => {
//     dispatch(showMessage('Saving task update'))
//     const {tasks} = getState().task
//     const task = tasks.find(t => t._id === id)
//     const toggled = {...task, isComplete: !task.isComplete}
//     updateTask(toggled)
//       .then(res =>console.log("From update response --> ",res)||dispatch(replaceTask(res)))
//   }
// }

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(showMessage('Removing task'))
    destroyTask(id)
      .then(() => dispatch(removeTask(id)))
  }
}

export const getVisibleTasks = (tasks, filter) => {
  switch(filter) {
    case 'active':
      return tasks.filter(t => !t.isComplete)
    case 'completed':
      return tasks.filter(t => t.isComplete)
    default:
      return tasks
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TASK_ADD:
      return {...state, currentTask: '', tasks: state.tasks.concat(action.payload)}
    case TASKS_LOAD:
      return {...state, tasks: action.payload}
    case CURRENT_UPDATE:
      return {...state, currentTask: action.payload}
    case TASK_REPLACE:
      return {...state,
        tasks: state.tasks
          .map(t => t._id === action.payload._id ? action.payload : t)
      }
    case TASK_REMOVE:
      return {...state,
        tasks: state.tasks.filter(t => t._id !== action.payload)
      }
    case LOAD_PROCESS_USERS:
    return {...state,userList:action.payload}
    case UPDATE_SELECTED_TASK:
    return {...state,selectedTask:action.payload}
    default:
      return state
  }
}
