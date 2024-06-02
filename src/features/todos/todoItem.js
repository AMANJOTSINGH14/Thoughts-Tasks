import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, editTodo } from './todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.userId);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(updateTodo({ userId, todoId: todo._id }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ userId, todoId: todo._id }));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editTodo({ userId, todoId: todo._id, newText }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <input
          type="text"
          className="form-control mr-2"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}
      <div>
        <button onClick={handleToggle} className="btn btn-secondary btn-sm mr-2">
          {todo.completed ? 'Uncomplete' : 'Complete'}
        </button>
        <button onClick={handleEdit} className="btn btn-info btn-sm mr-2">
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
