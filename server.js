import { NextResponse } from 'next/server';
import mysql from 'mysql2';

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

export async function POST(req) {
  const { email, password } = await req.json();

  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM Users WHERE email = ? AND password = ?',
      [email, password],
      (err, results) => {
        if (err) {
          console.error('Error querying data: ', err);
          reject(new NextResponse.json({ error: 'Failed to login' }, { status: 500 }));
        } else if (results.length > 0) {
          resolve(new NextResponse.json({ message: 'Login successful!' }, { status: 200 }));
        } else {
          resolve(new NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }));
        }
      }
    );
  });
}
