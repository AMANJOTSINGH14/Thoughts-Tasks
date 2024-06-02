const Thought = require('../models/Thoughts');

exports.getAllPublicThoughts = async (req, res) => {
    try {

      const thoughts = await Thought.find({ isPublic: true });
      console.log(thoughts)
      res.status(200).json(thoughts);
    } catch (error) {
      console.error('Error fetching public thoughts:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

exports.getThoughts = async (req, res) => {
  const { userId } = req.params;
  try {
    let thoughts;
    if (userId) {
      thoughts = await Thought.find({ userId });
    } else {
      thoughts = await Thought.find({ isPublic: true });
    }
    res.status(200).json(thoughts);
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.addThought = async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  try {
    const newThought = new Thought({
      text,
      userId,
    });
    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    console.error('Error adding thought:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.editThought = async (req, res) => {
  const { userId, thoughtId } = req.params;
  const { text } = req.body;
  try {
    const thought = await Thought.findOne({ _id: thoughtId, userId });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.text = text;
    await thought.save();
    res.status(200).json(thought);
  } catch (error) {
    console.error('Error editing thought:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteThought = async (req, res) => {
  const { userId, thoughtId } = req.params;
  try {
    const thought = await Thought.findOneAndDelete({ _id: thoughtId, userId });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json({ id: thoughtId });
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.toggleThoughtPrivacy = async (req, res) => {
  const { userId, thoughtId } = req.params;
  try {
    const thought = await Thought.findOne({ _id: thoughtId, userId });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.isPublic = !thought.isPublic;
    await thought.save();
    res.status(200).json(thought);
  } catch (error) {
    console.error('Error toggling thought privacy:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.likeThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.likes += 1;
    await thought.save();
    res.status(200).json(thought);
  } catch (error) {
    console.error('Error liking thought:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};