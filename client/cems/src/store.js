import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task';
import definitionsReducer from './reducers/processDefinitions';
import firmReducer from './reducers/firm';
import messageReducer from './reducers/messages';
import loginReducer from './reducers/login';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import createHistory from 'history/createBrowserHistory';
import { reducer as reduxFormReducer } from 'redux-form';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  task: taskReducer,
  firm:firmReducer,
  message: messageReducer,
  login:loginReducer,
  router: routerReducer,
  form: reduxFormReducer,
  definitions:definitionsReducer
})
const persistedReducer = persistReducer(persistConfig, reducer);


export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(thunk,middleware)
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}






