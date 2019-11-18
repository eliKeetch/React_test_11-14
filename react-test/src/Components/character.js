import axios from 'axios';

const initialState ={
    error: false,
    loading: false,
    character: {results: []},
    characterRace: {results: []}
};

const SET_CHARACTER = "SET_CHARACTER";
const CHARACTER_DETAILS = "CHARACTER_DETAILS";
const SET_RACE = "SET_RACE";
const ABILITY_SCORE = "ABILITY_SCORE";

export default function character( state = initialState, action ){
    console.log("running reducer", action.payload);
    switch(action.type){
        case SET_CHARACTER + "_PENDING":
            return{
                error: false,
                loading: true,
                character: { results: []}
            }
        case SET_CHARACTER + "_FULFILLED":
            console.log(action.payload, "char")
            return{
                error: false,
                loading: false,
                character: action.payload
                
            }
        case SET_CHARACTER + "_REJECTED":
            return{
                error: true,
                loading: true,
                character: {}
            }
        case CHARACTER_DETAILS + "_PENDING":
            return state
        case CHARACTER_DETAILS + "_FULFILLED":
            console.log(action.payload, "charDet")
            return {
                error: false,
                loading: false,
                characterDetails: action.payload
                
            }
        case ABILITY_SCORE + "_PENDING":
            return state
        case ABILITY_SCORE + "_FULFILLED":
            console.log(action.payload, "abilScr")
            return {
                error: false,
                loading: false,
                abilityScore: action.payload
                
            }
        case SET_RACE + "_PENDING":
                return state
        case SET_RACE + "_FULFILLED":
                return Object.assign({}, state, {characterRace: action.payload})    
        default: return state;
    }
}
export function setCharacter(url="http://www.dnd5eapi.co/api/classes"){
    console.log("working set character Class")
    const promise = axios.get(url).then(response => response.data);
    console.log("class", promise)
    return {
        type: SET_CHARACTER,
        payload: promise
    }
}
export function setRace(url="http://www.dnd5eapi.co/api/races"){
    console.log("working set race")
    const promise = axios.get(url).then(response => response.data);
    return {
        type: SET_RACE,
        payload: promise
    }
}
export function getAbilityScr(url="http://www.dnd5eapi.co/api/ability-scores"){
    console.log("working ability score")
    const promise = axios.get(url).then(response => response.data);
    return {
        type: SET_RACE,
        payload: promise
    }
}

export function characterDetails(url){
    console.log("working set character")
    const promise = axios.get(url).then(response => response.data);
    return {
        type: CHARACTER_DETAILS,
        payload: promise
    }
}