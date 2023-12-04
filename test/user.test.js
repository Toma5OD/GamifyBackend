require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const User = require('../models/user');
const { Pool } = require('pg');

describe('User Model', function() {
    // Testing user creation
    it('should create a new user', async function() {
        try {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123' };
            const user = await User.create(userData.username, userData.email, userData.password);
            expect(user).to.be.an('object');
            expect(user).to.have.property('email', userData.email);
            expect(user).to.have.property('username', userData.username);
            // You can add more assertions as needed
        } catch (error) {
            throw new Error(`User creation failed: ${error.message}`);
        }
    });

    // Testing finding a user
    it('should find a user by ID', async function() {
        // Assuming you have a user with a specific ID
        const userId = 1; // Replace with an actual ID
        const user = await User.findById(userId);
        expect(user).to.be.an('object');
        expect(user).to.have.property('id', userId);
        // More assertions can be added here
    });

    // Testing updating a user
    it('should update a user', async function() {
        const userId = 1; // Replace with an actual ID
        const updatedData = { username: 'updatedUser', email: 'updated@example.com', password: 'NewPassword123' };
        const updatedUser = await User.update(userId, updatedData.username, updatedData.email, updatedData.password);
        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('email', updatedData.email);
        expect(updatedUser).to.have.property('username', updatedData.username);
        // More assertions here
    });

    // Testing deleting a user
    it('should delete a user', async function() {
        const userId = 1; // Replace with an actual ID
        const deletedUser = await User.delete(userId);
        expect(deletedUser).to.be.an('object');
        expect(deletedUser).to.have.property('id', userId);
        // More assertions can be added here
    });

    // Add more tests as needed, including for validation and error handling
});
