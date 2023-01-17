import {
  ARTICLES_LOAD,
  // TICKETS_LOAD, LOADER_ON, LOADER_OFF, CHANGE_VISIBLE, ERROR_ON, ERROR_OFF,
} from './types';

const initialState = {
  articles: [],
  // loader: false,
  // visible: 5,
  // error: null,
};

export const postsReducer = (state = initialState, action) => {
  // console.log('ticketsReducer >', action);
  // console.log('state >>>>>>', state)

  switch (action.type) {
    case ARTICLES_LOAD:
      return {
        ...state,
        articles: action.data,
      };
  //   case LOADER_ON:
  //     return {
  //       ...state,
  //       loader: true,
  //     };
  //   case LOADER_OFF:
  //     return {
  //       ...state,
  //       loader: false,
  //     };
  //   case CHANGE_VISIBLE:
  //     return {
  //       ...state,
  //       visible:
  //         state.visible <= state.tickets.length
  //           ? state.visible + 5
  //           : state.visible + (state.tickets.length + state.visible),
  //     };
  //   case ERROR_ON:
  //     return {
  //       ...state,
  //       error: action.text,
  //     };
  //   case ERROR_OFF:
  //     return {
  //       ...state,
  //       error: null,
  //     };
    default:
      return state;
  }
};