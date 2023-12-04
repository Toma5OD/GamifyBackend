require('dotenv').config();

// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isValid = await bcrypt.compare(req.body.password, user.password_hash);

    if (!isValid) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.registerUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const user = await User.create(username, email, password);
      res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};

exports.updatePassword = async (req, res) => {
  try {
      const { id, newPassword } = req.body;
      const hashedPassword = await User.hashPassword(newPassword);
      await User.updatePassword(id, hashedPassword);
      res.status(200).send('Password updated successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      await User.delete(id);
      res.status(200).send('User deleted successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
};
