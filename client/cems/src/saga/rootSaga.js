import { takeLatest, call, put,all } from "redux-saga/effects";
import "babel-polyfill";
import {taskSaga} from './taskSaga';
import {processSaga} from './processSaga';
import {AddNoteSaga} from './addNoteSaga';
import {userSaga} from './userSaga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* rootSaga() {
    yield all([
       taskSaga,
       AddNoteSaga,
       processSaga,
       userSaga       
      ]) 
}

