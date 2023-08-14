import mysql from 'mysql2';
import console from "console";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.log(process.env)
    console.error('Error connecting to database:', error);
    return;
  }
  console.log('Connected to database');
});

export default connection;