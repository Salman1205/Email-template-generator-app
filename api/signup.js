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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
    
    connection.query(query, [username, email, password], (err, results) => {
      if (err) {
        console.error('Error inserting data: ', err);
        return res.status(500).json({ error: 'Failed to register user' });
      } else {
        console.log('User registered successfully:', results);
        return res.status(200).json({ message: 'User registered successfully!' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
