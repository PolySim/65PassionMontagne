import { Request, Response } from "express";
import connection from "~/db/database_connection";
import console from "console";
import { encrypt } from "~/Encrypt/encrypt";
import { decrypt } from "~/Encrypt/decrypt";
import * as util from "util";

export const getUserName = (req: Request, res: Response) => {
  connection.query("SELECT username FROM user", (error, results, fields) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Error executing query");
      return;
    }
    res.status(201).json(results);
  });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const { iv, passwordEncrypt } = encrypt(password);

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
      return res.json({ error: "username" });
    }

    if (emailResult[0]) {
      return res.json({ error: "email" });
    }

    await insertUserQuery({
      sql: `INSERT INTO user (email, password, iv, profilePicturePath, role, username)
            VALUES (?, ?, ?, 'default.jpg', 0, ?)`,
      values: [email, passwordEncrypt, iv, username],
    });

    const userId = (await getUserId({
      sql: `SELECT id
            FROM user
            WHERE email = ?`,
      values: [email],
    })) as [{ id: number }];

    return res.json({
      id: userId[0].id,
      username: username,
      profilePath: "default.jpg",
      role: 0,
      favorite: [],
    });
  } catch (error) {
    res.status(500).json({ error: "sign up error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
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
      return res.json({ error: "username" });
    }

    const passwordDecrypt = await decrypt(
      passwordResult[0].password,
      passwordResult[0].iv,
    );

    if (passwordDecrypt !== password) {
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
    return res.json({ ...result, favorite: favorite });
  } catch (error) {
    res.status(500).json({ error: "sign in error" });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, hikingId } = req.body;

    const addFavoriteQuery = util.promisify(connection.query).bind(connection);

    await addFavoriteQuery({
      sql: `INSERT INTO favorite (userId, hikingId)
            VALUES (?, ?)`,
      values: [userId, hikingId],
    });

    console.log("Favorite add with success");
    res.json({ result: "Favorite add with success" });
  } catch (error) {
    res.status(500).json({ error: "add favorite error" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, hikingId } = req.body;

    const removeFavoriteQuery = util
      .promisify(connection.query)
      .bind(connection);

    await removeFavoriteQuery({
      sql: `DELETE
            FROM favorite
            WHERE userId = ?
              AND hikingId = ?`,
      values: [userId, hikingId],
    });

    res.json({ result: "Remove favorite success" });
  } catch (error) {
    res.status(500).json({ error: "remove favorite error" });
  }
};
