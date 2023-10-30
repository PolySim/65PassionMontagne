import { Request, Response } from "express";
import * as util from "util";
import { createNewConnection } from "~/db/database_connection";
import console from "console";

export const getDifficulty = async (req: Request, res: Response) => {
  try {
    const connection = createNewConnection();
    const getDifficultyQuery = util
      .promisify(connection.query)
      .bind(connection);

    const difficulty = (await getDifficultyQuery({
      sql: `SELECT id, difficulty
            FROM difficulty`,
    })) as { id: number; difficulty: string }[];

    res.json(difficulty);
    connection.end();
  } catch (e) {
    console.log(`error in getDifficulty : ${e}`);
    res.status(500).json({ error: "getDifficulty error" });
  }
};
