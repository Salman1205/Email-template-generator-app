const mysql = require('mysql2');

const dbConfig = {
    host: 'emailtemplatebyateeb.mysql.database.azure.com',
    user: 'ateeb_admin',
    password: 'ishaq321!',
    database: 'ateeb_db',
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (req.method === 'POST') {
        const { email, password } = req.body;

        const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
        connection.query(query, [email, password], (err, results) => {
            if (err) {
                console.error('Error querying data: ', err);
                res.status(500).json({ error: 'Failed to login' });
            } else if (results.length > 0) {
                res.status(200).json({ message: 'Login successful!' });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
