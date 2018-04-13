import {getAllProcessUserService,getTodos,assignUserService, createTodo, updateTodo, destroyTodo,completeTodoService} from '../lib/todoServices'
import {showMessage} from './messages'

const initState = {
  todos: [],
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
  currentTodo: ''
}



export const TODO_ADD = 'TODO_ADD'
export const TODOS_LOAD = 'TODOS_LOAD'
const CURRENT_UPDATE = 'CURRENT_UPDATE'
export const TODO_REPLACE = 'TODO_REPLACE'
export const TODO_REMOVE = 'TODO_REMOVE';
export const LOAD_PROCESS_USERS = 'LOAD_PROCESS_USERS';
export const UPDATE_SELECTED_TASK='UPDATE_SELECTED_TASK';

export const updateCurrent = (val) => ({type:CURRENT_UPDATE, payload: val});
export const loadTodos = (todos) => ({type: TODOS_LOAD, payload: todos});
export const loadProcessUsers = (users) => ({type: LOAD_PROCESS_USERS, payload: users})
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo})
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo })
export const removeTodo = (id) => ({type: TODO_REMOVE, payload: id});
export const updateSelectedTask = (task) => ({type: UPDATE_SELECTED_TASK, payload: task});



export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Todos'))
    getTodos().then(todos=>console.log('<--Todos._embedded.task--> ',todos._embedded.task)||todos._embedded.task.map(task=>{
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
      .then(todos =>console.log(todos.todos)||dispatch(loadTodos(todos)))
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

export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Todo'))
    createTodo(name)
      .then(res => dispatch(addTodo(res)))
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

  export const completTodo = (taskIdid) => {
    return (dispatch, getState) => {
      dispatch(showMessage('Saving todo update'))
     
      const todo = {
        "taskId":taskId,
        "variables":{
          "workRequestNumber":{"value":"gro254689gf","type":"string"},
          "firmName":{"value":"Denel Aviation","type":"string"}
        }
        }
      completeTodoService(todo)
        .then(res =>console.log("From update response --> ",res)||dispatch(replaceTodo(res)))
    }
  }
// export const toggleTodo = (id) => {
//   return (dispatch, getState) => {
//     dispatch(showMessage('Saving todo update'))
//     const {todos} = getState().todo
//     const todo = todos.find(t => t._id === id)
//     const toggled = {...todo, isComplete: !todo.isComplete}
//     updateTodo(toggled)
//       .then(res =>console.log("From update response --> ",res)||dispatch(replaceTodo(res)))
//   }
// }

export const deleteTodo = (id) => {
  return (dispatch) => {
    dispatch(showMessage('Removing Todo'))
    destroyTodo(id)
      .then(() => dispatch(removeTodo(id)))
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)
    case 'completed':
      return todos.filter(t => t.isComplete)
    default:
      return todos
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)}
    case TODOS_LOAD:
      return {...state, todos: action.payload}
    case CURRENT_UPDATE:
      return {...state, currentTodo: action.payload}
    case TODO_REPLACE:
      return {...state,
        todos: state.todos
          .map(t => t._id === action.payload._id ? action.payload : t)
      }
    case TODO_REMOVE:
      return {...state,
        todos: state.todos.filter(t => t._id !== action.payload)
      }
    case LOAD_PROCESS_USERS:
    return {...state,userList:action.payload}
    case UPDATE_SELECTED_TASK:
    return {...state,selectedTask:action.payload}
    default:
      return state
  }
}
