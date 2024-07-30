import mysql from 'mysql2';

// Configure database connection
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

    console.log("function called");

    // CORS setup
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

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
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
