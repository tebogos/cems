import {showMessage} from './messages';

const initState = {
      errors:""
 
}



export const API_CALL_FAILURE = 'API_CALL_FAILURE';







export default (state = initState, action) => {
  switch (action.type) {
    
    case API_CALL_FAILURE:
      return {state,errors:action.payload}

    default:
      return state
  }
}
