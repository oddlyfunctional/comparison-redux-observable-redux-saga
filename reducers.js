import { combineReducers } from 'redux';

const translations = (state = {}, action) => {
  switch(action.type) {
    case "SET_TRANSLATIONS": return action.translations;
    default: return state;
  }
};

const like = (state = false, action) => {
  switch(action.type) {
    case 'SET_LIKE': return action.like;
    default: return state;
  }
};

export default combineReducers({ like, translations });
