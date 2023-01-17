import { configureStore } from "@reduxjs/toolkit";
// import { createLogger } from 'redux-logger'
import articleReducer from "./articleSlice";
import paginationReducer from "./paginationSlice";

export default configureStore({
  reducer: {
    articles: articleReducer,
    pagination: paginationReducer
  },
  // middleware: [createLogger]
})