import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import TodoInput from './features/todos/todoInput';
import TodoList from './features/todos/todoList';
import Thoughts from './features/thoughts/thoughts';
import { loadTodos } from './features/todos/todoSlice';
import { logout } from './features/auth/authSlice';
import PrivateRoute from './app/privateRoutes';
import Header from './features/todos/header';


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(loadTodos(user.userId));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Header />
      <div className="App container mt-5">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/todos" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/todos" /> : <Signup />} />
          <Route path="/todos" element={<PrivateRoute><TodoInput /><TodoList /></PrivateRoute>} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/" element={<Navigate to={user ? "/todos" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
