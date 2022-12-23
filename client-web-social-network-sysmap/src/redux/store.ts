import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./authSlice/AuthSlice";
import postReducer from "./postSlice/postSlice";
import profileReducer from "./profileSlice/profileSlice";
import commentReducer from "./commentSlice/commentSlice";
import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
import storage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";

const persistConfig = {
  key: "socialNetWork",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, authReducer);
const middleware: any = [thunk];
export const store = configureStore({
  reducer: {
    authReducer: userPersistedReducer,
    postReducer: postReducer,
    profileReducer: profileReducer,
    commentReducer: commentReducer,
    middleware,
  },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
