const Todo = require('../models/Todo');


exports.getTodos = async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.addTodo = async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
      userId
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.toggleTodo = async (req, res) => {
  const { userId, todoId } = req.params;
  try {
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteTodo = async (req, res) => {
  const { userId, todoId } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ id: todoId });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.editTodo = async (req, res) => {
    console.log(req)
    console.log(res)
  const { userId, todoId } = req.params;
  const { text } = req.body;
  try {
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.text = text;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error editing todo:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
