import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



import { createStore } from 'redux';
import { Provider } from 'react-redux';
const initialState={detailsData:[],count:0}
function reducer(state = initialState, actions) {
  console.log(state);
  switch (actions.type) {
    case 'ADDIN': return { ...state, invoiceno:  actions.payload  }
    case 'DELIN': return { ...state, invoiceno: 0 }
    case 'EIN':  return{detailsData:[...state.detailsData,actions.payload]}
    case 'EOUT': return { ...state, loginEmail: null }
    default: return state;
  }
}
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
