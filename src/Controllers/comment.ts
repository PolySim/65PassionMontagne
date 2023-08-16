import { Request, Response } from "express";
import * as util from "util";
import connection from "~/db/database_connection";
import console from "console";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, hikingId, userId } = req.body;

    const commentQuery = util.promisify(connection.query).bind(connection);

    const date = new Date();

    // Tableau de noms de mois en français
    const mois = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    // Construction de la date sous forme de chaîne
    const dateString =
      date.getDate() + " " + mois[date.getMonth()] + " " + date.getFullYear();

    await commentQuery({
      sql: `INSERT INTO Comments (hikingId, content, userid, date)
            VALUES (?, ?, ?, ?)`,
      values: [hikingId, content, userId, dateString],
    });

    res.json({ result: "comment success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in comments" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const hikingId = req.params.hikingId;

    const getCommentsQuery = util.promisify(connection.query).bind(connection);

    const commentsResult = (await getCommentsQuery({
      sql: `SELECT content, userid, username
            FROM Comments
                     JOIN user ON user.id = Comments.userid
            WHERE hikingId = ?`,
      values: [hikingId],
    })) as { content: string; userid: number; username: string }[];

    const commentsRefactor = commentsResult.map((comment) => ({
      content: comment.content,
      userId: comment.userid,
      username: comment.username,
    }));

    res.json(commentsRefactor);
  } catch (error) {
    res.status(500).json({ error: "get comments error" });
  }
};
