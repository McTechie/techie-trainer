const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/userModel');

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
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);
    
    const token = createToken(user._id);
  
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mssg: 'You are not authorized to access this resource',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select('_id');
  } catch (err) {
    return res.status(401).json({
      err: 'You are not authorized to access this resource'
    });
  }

  const { username } = req.params;
  
  const user = await User.findOneAndDelete({ username: username });
  
  if (!user) {
    return res.status(404).json({ error: 'No such user exists' });
  }

  return res.status(200).json(user);
}

module.exports = {
  loginUser,
  signupUser,
  deleteUser
}
