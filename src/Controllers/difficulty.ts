import { Request, Response } from "express";
import * as util from "util";
import connection from "~/db/database_connection";

export const getDifficulty = async (req: Request, res: Response) => {
  const getDifficultyQuery = util.promisify(connection.query).bind(connection);

  const difficulty = (await getDifficultyQuery({
    sql: `SELECT id, difficulty
          FROM difficulty`,
  })) as { id: number; difficulty: string }[];

  res.json(difficulty);
};
