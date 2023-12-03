const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Hello from Gamify Backend!');
});

// Routes
app.use('/api', userRoutes);

// other app settings (if any)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
