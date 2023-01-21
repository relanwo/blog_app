import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from 'redux-logger'
import articleReducer from "./article-slice";
import userReducer from "./user-slice";
// import paginationReducer from "./paginationSlice";

export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer
    // pagination: paginationReducer
  },
  // middleware: [createLogger]
})