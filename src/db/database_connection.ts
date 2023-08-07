import mysql from 'mysql2';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Simon_256',
  database: '65PassionMountain'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to database');
});

export default connection;