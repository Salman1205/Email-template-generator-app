const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'emailtemplatebyateeb.mysql.database.azure.com',
    user: process.env.DB_USER || 'ateeb_admin',
    password: process.env.DB_PASSWORD || 'ishaq321!',
    database: process.env.DB_NAME || 'ateeb_db',
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
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
app.post('/api/login', (req, res) => {
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
