import { combineReducers } from 'redux';
import jokeReducer from './jokeReducer';

const reducers = combineReducers({
    jokes: jokeReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;