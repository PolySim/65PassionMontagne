import mysql from "mysql2";
import {Response} from "express";
import console from "console";

type Error = (error: mysql.QueryError | null, res: Response) => void

const error_query: Error = (error, res) => {
  if (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
    return;
  }
}

export default error_query