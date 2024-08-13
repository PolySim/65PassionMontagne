import { Request, Response } from "express";
import console from "console";
import { encrypt } from "~/Encrypt/encrypt";
import { decrypt } from "~/Encrypt/decrypt";
import * as util from "util";
import path from "path";
import process from "process";
import { createNewConnection } from "~/db/database_connection";
import {decodeToken, getEmailByReq} from "~/Encrypt/jwt";

const jwt = require("jsonwebtoken");

export const getUserName = (req: Request, res: Response) => {
  try {
    const connection = createNewConnection();
    connection.query("SELECT username FROM user", (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Error executing query");
        return;
      }
      res.status(201).json(results);
    });
    connection.end();
  } catch (e) {
    console.log(`error in getUserName : ${e}`);
    res.status(500).json({ error: "getUserName error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const { iv, passwordEncrypt } = encrypt(password);

    const connection = createNewConnection();
    const checkUsernameQuery = util
      .promisify(connection.query)
      .bind(connection);
    const checkEmailQuery = util.promisify(connection.query).bind(connection);
    const insertUserQuery = util.promisify(connection.query).bind(connection);
    const getUserId = util.promisify(connection.query).bind(connection);

    const usernameResult = (await checkUsernameQuery({
      sql: `SELECT id
            FROM user
            WHERE username = ?`,
      values: [username],
    })) as [{ id: number }];

    const emailResult = (await checkEmailQuery({
      sql: `SELECT id
            FROM user
            WHERE email = ?`,
      values: [email],
    })) as [{ id: number }];

    if (usernameResult[0]) {
      connection.end();
      return res.json({ error: "username" });
    }

    if (emailResult[0]) {
      connection.end();
      return res.json({ error: "email" });
    }

    await insertUserQuery({
      sql: `INSERT INTO user (email, password, iv, profilePicturePath, role, username)
            VALUES (?, ?, ?, 'default.png', 0, ?)`,
      values: [email, passwordEncrypt, iv, username],
    });

    const userId = (await getUserId({
      sql: `SELECT id
            FROM user
            WHERE email = ?`,
      values: [email],
    })) as [{ id: number }];

    const accessToken = jwt.sign(userId[0].id, process.env.TOKEN);

    connection.end();
    return res.json({
      id: userId[0].id,
      username: username,
      profilePath: "default.png",
      role: 0,
      favorite: [],
      token: accessToken,
    });
  } catch (error) {
    console.log(`error in signUp : ${error}`);
    res.status(500).json({ error: "sign up error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const connection = createNewConnection();
    const getPasswordEncrypt = util
      .promisify(connection.query)
      .bind(connection);
    const getFavorite = util.promisify(connection.query).bind(connection);

    const passwordResult = (await getPasswordEncrypt({
      sql: `SELECT id, iv, password, username, profilePicturePath, role
            FROM user
            WHERE username = ?
               OR email = ? `,
      values: [username, username],
    })) as [
      {
        id: number;
        iv: string;
        password: string;
        username: string;
        profilePicturePath: string;
        role: number;
      },
    ];

    if (!passwordResult[0]) {
      connection.end();
      return res.json({ error: "username" });
    }

    const passwordDecrypt = await decrypt(
      passwordResult[0].password,
      passwordResult[0].iv,
    );

    if (passwordDecrypt !== password) {
      connection.end();
      return res.json({ error: "password" });
    }

    const favoriteResult = (await getFavorite({
      sql: `SELECT hikingId
            FROM favorite
            WHERE userId = ?`,
      values: [passwordResult[0].id],
    })) as { hikingId: number }[];
    const favorite = favoriteResult.reduce(
      (acc: number[], curr) => [...acc, curr.hikingId],
      [],
    );

    const result = Object.keys(passwordResult[0])
      .filter((key) => key !== "password" && key !== "iv")
      .reduce((acc: { [key: string]: string | number }, curr) => {
        // @ts-ignore
        return Object.assign(acc, { [curr]: passwordResult[0][curr] });
      }, {});

    const accessToken = jwt.sign(result.id, process.env.TOKEN);

    connection.end();
    return res.json({ ...result, favorite: favorite, token: accessToken });
  } catch (error) {
    console.log(`error in sign in : ${error}`);
    res.status(500).json({ error: "sign in error" });
  }
};

export const signInToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    let userId: number;
    try {
      userId = parseInt(jwt.verify(token, process.env.TOKEN));
    } catch (e) {
      console.log(`error in token verify : ${e}`);
      res.json({ error: "token verify error" });
      return;
    }

    const connection = createNewConnection();
    const getUserInformation = util
      .promisify(connection.query)
      .bind(connection);
    const getFavorite = util.promisify(connection.query).bind(connection);

    const userInformation = (await getUserInformation({
      sql: `SELECT id, username, profilePicturePath, role
            FROM user
            WHERE id = ?`,
      values: [userId],
    })) as [
      {
        id: number;
        username: string;
        profilePicturePath: string;
        role: number;
      },
    ];

    const favorite = (await getFavorite({
      sql: `SELECT hikingId
            FROM favorite
            WHERE userId = ?`,
      values: [userId],
    })) as { hikingId: number }[];

    res.json({
      ...userInformation[0],
      favorite: favorite.map((id) => id.hikingId),
    });
    connection.end();
  } catch (error) {
    console.log(`connection with token error : ${error}`);
    res.json({ error: "connection with token" });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { hikingId } = req.body;

    const email = getEmailByReq(req, res);
    if (!email) return res.status(401)

    const connection = createNewConnection();
    const addFavoriteQuery = util.promisify(connection.query).bind(connection);

    await addFavoriteQuery({
      sql: `INSERT INTO favorite (userId, hikingId)
            VALUES (?, ?)`,
      values: [email, hikingId],
    });

    console.log("Favorite add with success");
    res.json({ result: "Favorite add with success" });
    connection.end();
  } catch (error) {
    res.status(500).json({ error: "add favorite error" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { hikingId } = req.body;

    const email = getEmailByReq(req, res);
    if (!email) return res.status(401)

    const connection = createNewConnection();
    const removeFavoriteQuery = util
      .promisify(connection.query)
      .bind(connection);

    await removeFavoriteQuery({
      sql: `DELETE
            FROM favorite
            WHERE userId = ?
              AND hikingId = ?`,
      values: [email, hikingId],
    });

    res.json({ result: "Remove favorite success" });
    connection.end();
  } catch (error) {
    console.log(`error in removeFavorite : ${error}`);
    res.status(500).json({ error: "remove favorite error" });
  }
};

export const imageUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const connection = createNewConnection();
    const imageQuery = util.promisify(connection.query).bind(connection);

    const pathResult = (await imageQuery({
      sql: `SELECT profilePicturePath
            FROM user
            WHERE id = ?`,
      values: [userId],
    })) as [{ profilePicturePath: string }];

    pathResult[0]
      ? res.sendFile(
          path.join(
            __dirname,
            `data/user_image/${pathResult[0].profilePicturePath}`,
          ),
        )
      : res.sendFile(path.join(__dirname, `data/user_image/default.png`));
    connection.end();
  } catch (e) {
    console.log(`error in imageUser : ${e}`);
    res.status(500).json({ error: "imageUser error" });
  }
};
