/* eslint-disable no-unused-vars */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { createLogger } from 'redux-logger'
import articleReducer from "./article-slice";
import userReducer from "./user-slice";
// import paginationReducer from "./paginationSlice";

import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'

const rootReducer = combineReducers({
    articles: articleReducer,
    user: userReducer,
    // pagination: paginationReducer
  })

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export default store
// export default configureStore({
//   reducer: {
//     articles: articleReducer,
//     user: userReducer
//     // pagination: paginationReducer
//   }
//   // middleware: [createLogger]
// })