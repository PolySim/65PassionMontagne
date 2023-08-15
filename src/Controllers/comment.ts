import { Request, Response } from "express";
import * as util from "util";
import connection from "~/db/database_connection";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, hikingId, userId } = req.body;

    const commentQuery = util.promisify(connection.query).bind(connection);

    await commentQuery({
      sql: `INSERT INTO Comments (hikingId, content, userid)
            VALUES (?, ?, ?)`,
      values: [hikingId, content, userId],
    });

    res.json({ result: "comment success" });
  } catch (error) {
    res.status(500).json({ error: "Error in comments" });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const hikingId = req.params.hikingId;

    const getCommentsQuery = util.promisify(connection.query).bind(connection);

    const commentsResult = (await getCommentsQuery({
      sql: `SELECT content, userid
            FROM Comments
            WHERE hikingId = ?`,
      values: [hikingId],
    })) as { content: string; userid: number }[];

    const commentsRefactor = commentsResult.map((comment) => ({
      content: comment.content,
      userId: comment.userid,
    }));

    res.json(commentsRefactor);
  } catch (error) {
    res.status(500).json({ error: "get comments error" });
  }
};
