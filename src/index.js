/* eslint-disable no-unused-vars */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { rootReducer } from './redux/rootReducer';
import App from './components/App/App';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<Provider store={store}>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
		</Provider>
);
