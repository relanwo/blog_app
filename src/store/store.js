import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import articleReducer from './article-slice';
import userReducer from './user-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'articles'],
};

const userConfig = {
  key: 'user',
  storage,
  blacklist: ['error', 'status'],
};

const rootReducer = combineReducers({
  articles: articleReducer,
  user: persistReducer(userConfig, userReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store;
