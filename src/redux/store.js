import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'reduxjs-toolkit-persist';
import sessionStorage from 'reduxjs-toolkit-persist/es/storage/session';
import thunk from 'redux-thunk';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import AuthReducer from './auth/AuthReducer';
import JobReducer from './job/JobReducer';
import JobListReducer from './job/JobListReducer';
import JobSelectReducer from './job/JobSelectReducer';
import JobApplyWebForm from './Client/JobApplyWebformReducer';
import assesment from './a/assesment';
import { apiBasePath } from './services/BaseUrl';
import { rtkQueryErrorLogger } from './services/UnautthorizationMiddleWare';

// const sessionStorageTransform = createTransform(
//   // it is usefull to hide the value from session storage.
//   (state) => { },
//   (state) =>
//     // console.log('state', state);
//     ({ ...state, session: { ...state.session, timestamp: Date.now() }, }),
//   {}

// );

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage,
  stateReconciler: autoMergeLevel1,
  // transforms: [sessionStorageTransform],
};

const reducers = combineReducers({
  login: AuthReducer,
  api: apiBasePath.reducer,
  job: JobReducer,
  allJobs: JobListReducer,
  selectedJob: JobSelectReducer,
  jobApplyWebFormData: JobApplyWebForm,
  assesment: assesment
});
const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk, apiBasePath.middleware, rtkQueryErrorLogger),
  // preloadedState: true,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
