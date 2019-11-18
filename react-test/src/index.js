import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import store from './store';
import promiseMiddleware from 'redux-promise-middleware';
import character from './Components/character.js';



ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
         document.getElementById('root')
         
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
