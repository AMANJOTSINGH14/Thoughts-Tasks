import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const login = (credentials) => api.post('/user/login', credentials);
export const signup = (credentials) => api.post('/user/signup', credentials);
export const fetchTodos = (userId) => api.get(`/todos/${userId}`);
export const addTodo = (userId, todo) => api.post(`/todos/${userId}`, todo);
export const toggleTodo = (userId, todoId) => api.patch(`/todos/${userId}/${todoId}/toggle`);
export const removeTodo = (userId, todoId) => api.delete(`/todos/${userId}/${todoId}`);
export const updateTodoText = (userId, todoId, text) => api.patch(`/todos/${userId}/${todoId}/edit`, { text });
export const fetchPublicThoughtsApi = () => api.get(`/thoughts/public`); 
export const fetchThoughtsApi = (userId) => api.get(`/thoughts/${userId}`);
export const addThoughtApi = (userId, text) => api.post(`/thoughts/${userId}`, { text });
export const editThoughtApi = (userId, thoughtId, text) => api.patch(`/thoughts/${userId}/${thoughtId}/edit`, { text });
export const deleteThoughtApi = (userId, thoughtId) => api.delete(`/thoughts/${userId}/${thoughtId}`);
export const toggleThoughtPrivacyApi = (userId, thoughtId) => api.patch(`/thoughts/${userId}/${thoughtId}/toggle`);
export const likeThoughtApi = (thoughtId) => api.post(`/thoughts/${thoughtId}/like`); 