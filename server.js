// backend/server.js 
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use environment variables for database credentials
const dbConfig = {
    host: process.env.DB_HOST, // e.g., 'emailtemplatebyateeb.mysql.database.azure.com'
    user: process.env.DB_USER, // e.g., 'ateeb_admin'
    password: process.env.DB_PASSWORD, // e.g., 'ishaq321!'
    database: process.env.DB_NAME // e.g., 'ateeb_db'
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
        // You might want to return an error here for the serverless function 
    } else {
        console.log('Connected to the database.');
    }
});

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' })); // Allow requests from any origin

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';

    connection.query(query, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).json({ error: 'Failed to register user' });
        } else {
            console.log('User registered successfully:', results);
            res.status(200).json({ message: 'User registered successfully!' });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying data: ', err);
            res.status(500).json({ error: 'Failed to login' });
        } else if (results.length > 0) {
            console.log('Login successful:', results);
            res.status(200).json({ message: 'Login successful!' });
        } else {
            console.log('Invalid credentials');
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Export the app (required for serverless functions)
module.exports = app; 