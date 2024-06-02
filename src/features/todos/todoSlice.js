// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, toggleTodo, removeTodo, updateTodoText } from '../../services/Api';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const loadTodos = createAsyncThunk('todos/loadTodos', async (userId) => {
  const response = await fetchTodos(userId);
  return response.data;
});

export const createTodo = createAsyncThunk('todos/createTodo', async ({ userId, text }) => {
  const response = await addTodo(userId, { text });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ userId, todoId }) => {
  const response = await toggleTodo(userId, todoId);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async ({ userId, todoId }) => {
  await removeTodo(userId, todoId);
  return todoId;
});

export const editTodo = createAsyncThunk('todos/editTodo', async ({ userId, todoId, newText }) => {
  const response = await updateTodoText(userId, todoId, newText);
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        state.todos[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        console.log(state,"jkj",action)
        const index = state.todos.findIndex((todo) => todo._id === action.payload._id);
        state.todos[index] = action.payload;
      });
  },
});

export default todosSlice.reducer;
