import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import { checkAuth } from "./actions/auth";
import authReducer from "./reducers/auth";
// ...

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
