const express = require('express');
const { getTodos, addTodo, toggleTodo, deleteTodo, editTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/:userId', getTodos);
router.post('/:userId', addTodo);
router.patch('/:userId/:todoId/toggle', toggleTodo);
router.delete('/:userId/:todoId', deleteTodo);
router.patch('/:userId/:todoId/edit', editTodo);

module.exports = router;
