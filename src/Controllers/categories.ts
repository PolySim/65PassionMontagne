import { Request, Response } from "express";
import error_query from "~/db/error_query";
import mysql from "mysql2";
import path from "path";
import console from "console";
import process from "process";
import { createNewConnection } from "~/db/database_connection";

export const getCategoriesImage = (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const connection = createNewConnection();
    connection.query(
      `SELECT path
       FROM categories
       WHERE id = ${categoryId}`,
      (error, results: mysql.RowDataPacket[]) => {
        error_query(error, res);
        const imagePath: string = results[0].path;
        res.sendFile(
          path.join(process.env.PATH_DATA || "", `/Menu/${imagePath}`),
        );
      },
    );
    connection.end();
  } catch (e) {
    console.log(`error in getCategoriesImage : ${e}`);
    res.status(500).json({ error: "getCategoriesImage error" });
  }
};

type CategoriesInformation = {
  id: number;
  name: string;
  name_en: string;
  withState: 0 | 1;
}[];

export const getCategoriesInformation = (req: Request, res: Response) => {
  try {
    const connection = createNewConnection();
    connection.query(
      `SELECT id, name, name_en, withState
       FROM categories;`,
      (error, results: CategoriesInformation) => {
        error_query(error, res);
        res.json(
          results.map((result) => ({
            ...result,
            withState: result.withState === 1,
          })),
        );
      },
    );
    connection.end();
  } catch (e) {
    console.log(`error in getCategoriesInformation : ${e}`);
    res.status(500).json({ error: "getImages error" });
  }
};
