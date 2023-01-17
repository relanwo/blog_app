/* eslint-disable no-unused-vars */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { rootReducer } from './redux/rootReducer';
import App from './components/app/app';
import store from './store/store';

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<Provider store={store}>
			<App />
		</Provider>
);
