import {getDefinitionsService} from '../lib/processDefService';
import {showMessage} from './messages';

const initState = {
    definitions: []
 
}



export const LOAD_DIFINITIONS = 'LOAD_DIFINITIONS';


export const loadDifinition = (difinitions) => ({type: LOAD_DIFINITIONS, payload: difinitions});



export const getDefinitions = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading difinitions'))
    getDefinitionsService().then(difinitions=>dispatch(loadDifinition(difinitions)));
    
  }

  
}


export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_DIFINITIONS:
      return {...state, definitions: action.payload}
    default:
      return state
  }
}
