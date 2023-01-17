import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
// import { sidebarReducer } from './sidebarReducer';
// import { ticketsReducer } from './ticketsReducer';

export const rootReducer = combineReducers({
  // filterReducer,
  // sidebarReducer,
  // ticketsReducer,
  postsReducer
});