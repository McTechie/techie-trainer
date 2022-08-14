const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.login(username, password);
    
    const token = createToken(user._id);
  
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    
    const token = createToken(user._id);
  
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

module.exports = {
  loginUser,
  signupUser
}