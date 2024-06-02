const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      console.log({ userId: user._id, email: user.email, token }); // Add this line
      res.status(201).json({ userId: user._id, email: user.email, token });
    } catch (error) {
      res.status(400).json({ message: 'User already exists' });
    }
  };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      res.status(200).json({ userId: user._id, email: user.email, token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
