import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTodos } from './todoSlice';
import TodoItem from './todoItem';
import TodoHeader from './todoHeader';

const TodoList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    if (user) {
      dispatch(loadTodos(user.userId));
    }
  }, [dispatch, user]);

  // Split todos into completed and incomplete lists
  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="container mt-5">
      <TodoHeader />
      <div className="row mt-3">
        <div className="col-md-6">
          <h3>Incomplete Tasks</h3>
          <ul className="list-group">
            {incompleteTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Completed Tasks</h3>
          <ul className="list-group">
            {completedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
