import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import character from './Components/character.js';


export default createStore(character, null, applyMiddleware(promiseMiddleware ));