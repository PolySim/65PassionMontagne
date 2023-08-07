import {Request, Response} from "express";
import connection from "~/db/database_connection";

export const getUserName = ((req: Request, res: Response) => {
  connection.query('SELECT username FROM user', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(201).json(results);
  })
});