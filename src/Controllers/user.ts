import {Request, Response} from "express";
import connection from "~/db/database_connection";
import console from "console";
import {encrypt} from "~/Encrypt/encrypt";
import {decrypt} from "~/Encrypt/decrypt";
import * as util from "util";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

export const signUp = (async (req: Request, res: Response) => {
  try {
    const {username, password, email} = req.body;
    const {iv, passwordEncrypt} = encrypt(password)

    const checkUsernameQuery = util.promisify(connection.query).bind(connection);
    const checkEmailQuery = util.promisify(connection.query).bind(connection);
    const insertUserQuery = util.promisify(connection.query).bind(connection);

    const usernameResult = await checkUsernameQuery({
      sql: `SELECT id
            FROM user
            WHERE username = ?`,
      values: [username],
    }) as [{ id: number }];

    const emailResult = await checkEmailQuery({
      sql: `SELECT id
            FROM user
            WHERE email = ?`,
      values: [email],
    }) as [{ id: number }];

    if (usernameResult[0]) {
      return res.json({username: 'error'});
    }

    if (emailResult[0]) {
      return res.json({email: 'error'});
    }

    await insertUserQuery({
      sql: `INSERT INTO user (email, password, iv, profilePicturePath, role, username)
            VALUES (?, ?, ?, 'default.jpg', 0, ?)`,
      values: [email, passwordEncrypt, iv, username],
    });

    return res.json({username: username, profilePath: 'default.jpg', role: 0})

  } catch (error) {
    res.status(500).json({error: "sign up error"});
  }
})

export const signIn = (async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body;
    const getPasswordEncrypt = util.promisify(connection.query).bind(connection);

    const passwordResult = await getPasswordEncrypt({
      sql: `SELECT iv, password, username, profilePicturePath, role
            FROM user
            WHERE username = ?
               OR email = ? `,
      values: [username, username]
    }) as [{ iv: string, password: string, username: string, profilePicturePath: string, role: number }]

    if (!passwordResult[0]) {
      return res.json({username: 'error'})
    }

    console.log(passwordResult)
    const passwordDecrypt = await decrypt(passwordResult[0].password, passwordResult[0].iv)

    if (passwordDecrypt !== password) {
      return res.json({password: 'error'})
    }

    const result = Object.keys(passwordResult[0])
      .filter(key => key !== 'password' && key !== 'iv')
      .reduce((acc: { [key: string]: string | number }, curr) => {
        // @ts-ignore
        return Object.assign(acc, {[curr]: passwordResult[0][curr]})
      }, {})
    return res.json(result)


  } catch (error) {
    res.status(500).json({error: "sign in error"});
  }
})