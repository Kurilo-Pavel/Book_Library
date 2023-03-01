import {configureStore} from "@reduxjs/toolkit";
import filesReducer from "./filesSlice/filesSlice";

const store = configureStore(
  {
    reducer: {
      files: filesReducer,
    }
  }
);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;