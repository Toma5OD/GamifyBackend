require('dotenv').config();

const bcrypt = require('bcrypt');
const pool = require('../db/db');

class User {
    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    static isValidEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static async hashPassword(password) {
        if (typeof password !== 'string') {
            throw new Error("Password must be a string.");
        }
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }    

    static async create(username, email, password) {
        if (!username || !email || !password) {
            throw new Error("Missing fields: All fields are required.");
        }
        if (!this.isValidEmail(email)) {
            throw new Error("Invalid email format.");
        }
        const hashedPassword = await this.hashPassword(password);
        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        return rows[0];
    }

    static async findByEmail(email) {
        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    static async update(id, username, email, password) {
        const hashedPassword = await this.hashPassword(password);
        const { rows } = await pool.query(
            'UPDATE users SET username = $2, email = $3, password = $4 WHERE id = $1 RETURNING *',
            [id, username, email, hashedPassword]
        );
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    }
}

module.exports = User;
