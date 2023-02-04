import { configureStore, combineReducers } from "@reduxjs/toolkit";
import articleReducer from "./article-slice";
import userReducer from "./user-slice";

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

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'articles']
};

const userConfig = {
  key: 'user',
  storage,
  blacklist: ['error', 'status']
};

const rootReducer = combineReducers({
  articles: articleReducer,
  user: persistReducer(userConfig, userReducer),
})

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