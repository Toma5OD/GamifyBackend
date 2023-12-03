const bcrypt = require('bcrypt');
const getUserByEmail = require('./yourFunctionToGetUser'); // Import your function

exports.authenticateUser = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
      return res.status(401).send('Authentication failed');
    }

    const isValid = await bcrypt.compare(req.body.password, user.password_hash);

    if (!isValid) {
      return res.status(401).send('Authentication failed');
    }

    // Authentication successful
    res.send('Logged in successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
