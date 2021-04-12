import React, { useReducer } from 'react';
import MainLayout from './components/layout/MainLayout';
import { combineReducers, initialState } from "./store/reducers";
import { Store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( // make overflow hidden in production
    <div className="App"
      style={{
        overflow: process.env.REACT_APP_ENVIROMENT === "production" ? "hidden" : "auto"
      }
      }>
      <Store.Provider value={useReducer(combineReducers, initialState)}>
        <MainLayout />
        <ToastContainer/>
      </Store.Provider>
    </div>
  );
}

export default App;
