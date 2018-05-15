import {TASK_ADD, TASK_LOAD, TASK_REPLACE, TASK_REMOVE} from './task'

const SHOW_MESSAGE = 'SHOW_MESSAGE';
const RESET_MESSAGE='RESET_MESSAGE';

export const showMessage = (msg) => ({type: SHOW_MESSAGE, payload: msg})

export default function(state='', action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      return action.payload
    case RESET_MESSAGE:
       return ""
    case TASK_ADD:
    case TASK_LOAD:
    case TASK_REPLACE:
    case TASK_REMOVE:
      return ''
    default:
      return state
  }
}
