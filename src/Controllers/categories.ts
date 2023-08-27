import { Request, Response } from "express";
import connection from "~/db/database_connection";
import error_query from "~/db/error_query";
import mysql from "mysql2";
import path from "path";
import console from "console";

export const getCategoriesImage = (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  connection.query(
    `SELECT path
                    FROM categories
                    WHERE id = ${categoryId}`,
    (error, results: mysql.RowDataPacket[]) => {
      error_query(error, res);
      const imagePath: string = results[0].path;
      res.sendFile(path.join(__dirname, `data/Menu/${imagePath}`));
    },
  );
};

type CategoriesInformation = {
  id: number;
  name: string;
  name_en: string;
}[];

export const getCategoriesInformation = (req: Request, res: Response) => {
  connection.query(
    `SELECT id, name, name_en
                    FROM categories;`,
    (error, results: CategoriesInformation) => {
      error_query(error, res);
      res.json(results);
    },
  );
};
