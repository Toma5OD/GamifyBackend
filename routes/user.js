require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/authController');

// POST route for user registration
router.post('/register', authController.registerUser);

// POST route for user login/authentication
router.post('/login', authController.authenticateUser);

// PUT route for updating user password
router.put('/users/:id/password', authController.updatePassword);


// GET route to find a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// POST route to create a new user
router.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create(username, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

// PUT route to update an existing user
router.put('/users/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.update(req.params.id, username, email, password);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
});

// DELETE route to delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.delete(req.params.id);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).send('User not found');
    }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
