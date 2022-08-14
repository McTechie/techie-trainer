const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: {
      index: true,
      message: 'Username already exists'
    }
  },
  email: {
    type: String,
    required: true,
    unique: {
      index: true,
      message: 'Email already exists'
    }
  },
  password: {
    type: String,
    required: true
  }
});

// custom static methods (cannot be arrow function)
userSchema.statics.signup = async function (username, email, password) {
  // Validation
  if (!username || !email || !password) {
    throw new Error('All fields must be filled');
  }
  
  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password not strong enough');
  }

  const alreadyExists = await this.findOne(email);

  if (alreadyExists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash
  });

  return user;
}

userSchema.statics.login = async function (username, password) {
  // Validation
  if (!username || !email || !password) {
    throw new Error('All fields must be filled');
  }
  
  const user = await this.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Password is incorrect');
  }

  return user;
}

module.exports = mongoose.model('User', userSchema);;
