import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import { userLoginReducer,
         userProfileReducer,
         userUpdateReducer,
         userRegisterReducer } from './reducers/userReducer'

import { providerApplicationsReducer,
         applicationsViewReducer,
         applicationsUpdateReducer,
         createInternshipReducer,
         updateInternshipReducer,
         internshipViewReducer,
         deleteInternshipReducer,
         studentApplicationsReducer,
         studentApplicationsViewReducer,
         deleteApplyReducer ,
         createApplyReducer} from './reducers/applicationsReducer'

const reducer = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userUpdateReducer,
  providerApplicationsReducer,
  applicationsViewReducer,
  applicationsUpdateReducer,
  createInternshipReducer,
  updateInternshipReducer,
  internshipViewReducer,
  deleteInternshipReducer,
  studentApplicationsReducer,
  studentApplicationsViewReducer,
  deleteApplyReducer,
  createApplyReducer,

})

const localStoreUser = localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLoginReducer: {userInfo : localStoreUser}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
