import { combineReducers } from "@reduxjs/toolkit";
import jokeReducer from "./jokeReducer";

const reducers = combineReducers({
  jokes: jokeReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
