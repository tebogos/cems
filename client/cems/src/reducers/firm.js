import {getFirmsService} from '../lib/firmServices';
import {showMessage} from './messages';

const initState = {
  firms: [],
  firmNames:[],
    selectedFirm: {}
}



export const ADD_FIRM = 'ADD_FIRM';
export const LOAD_FIRM = 'LOAD_FIRM';
export const LOAD_FIRM_NAMES='LOAD_FIRM_NAMES';
export const UPDATE_SELECTED_FIRM='UPDATE_SELECTED_FIRM';


export const updateSelectedFirmAction = (firm) => ({type: UPDATE_SELECTED_FIRM, payload: firm});
export const loadFirms = (firms) => ({type: LOAD_FIRM, payload: firms});
export const loadFirmNames = (firmNames) => ({type: LOAD_FIRM_NAMES, payload: firmNames});
export const addFirm = (firm) => ({type: ADD_FIRM, payload: firm})

export const updateSelectedFirm=(firm)=>{
    return (dispatch)=>{
         dispatch(updateSelectedFirmAction(firm));
    }
}

export const getFirms = (searchString) => {
  console.log("My userID for getMytask request",searchString);
  
  return (dispatch) => {
    dispatch(showMessage('Loading Tasks'))
    getFirmsService(searchString).then(firms=>{
        dispatch(loadFirms(firms));
        return firms.map(firm=>{
    return(firm.name)
       })}).then(names=>dispatch(loadFirmNames(names)));
    
  }

  
}


export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_FIRM:
      return {...state, firms: action.payload}
    case LOAD_FIRM_NAMES:
      return {...state,firmNames:action.payload}
    case UPDATE_SELECTED_FIRM:
      return {...state,selectedFirm:action.payload}
   
    default:
      return state
  }
}
