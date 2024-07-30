import mysql from 'mysql2';

const dbConfig = {
  host: 'emailtemplatebyateeb.mysql.database.azure.com',
  user: 'ateeb_admin',
  password: 'ishaq321!',
  database: 'ateeb_db',
};

const connection = mysql.createConnection(dbConfig);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error querying data: ', err);
        return res.status(500).json({ error: 'Failed to login' });
      } else if (results.length > 0) {
        console.log('Login successful:', results);
        return res.status(200).json({ message: 'Login successful!' });
      } else {
        console.log('Invalid credentials');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
