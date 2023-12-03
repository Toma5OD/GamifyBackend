const pool = require('../db');

class User {
    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    }

    // Other methods like create, update, delete...
}

module.exports = User;
