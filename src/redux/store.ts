import reducers from './reducers/combine';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: reducers })
