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
        process.exit(1); // Exit if database connection fails
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;
        const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';

        connection.query(query, [username, email, password], (err, results) => {
            if (err) {
                console.error('Error inserting data: ', err);
                res.status(500).json({ error: 'Failed to register user' });
            } else {
                res.status(200).json({ message: 'User registered successfully!' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
