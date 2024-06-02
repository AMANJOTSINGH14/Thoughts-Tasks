import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todosReducer from '../features/todos/todoSlice';
import thoughtsReducer from '../features/thoughts/thoughtsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    thoughts: thoughtsReducer,
  },
});

export default store;
