const express = require('express');
const {
  loginUser,
  signupUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

router.delete('/delete/:username', deleteUser);

module.exports = router;