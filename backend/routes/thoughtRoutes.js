const express = require('express');
const { getThoughts, addThought, editThought, deleteThought, toggleThoughtPrivacy,getAllPublicThoughts, likeThought } = require('../controllers/thoughtController');

const router = express.Router();
router.get('/public', getAllPublicThoughts);
router.get('/:userId?', getThoughts); // If userId is provided, fetch user's thoughts, otherwise fetch public thoughts
router.post('/:userId', addThought); // This is the route for adding a thought
router.patch('/:userId/:thoughtId/edit', editThought);
router.delete('/:userId/:thoughtId', deleteThought);
router.patch('/:userId/:thoughtId/toggle', toggleThoughtPrivacy);
router.post('/:thoughtId/like', likeThought);
module.exports = router;
