import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from './todoSlice';

const TodoInput = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(createTodo({ userId, text }));
      setText('');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo"
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">Add Todo</button>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
