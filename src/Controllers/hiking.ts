import connection from "~/db/database_connection";
import { Request, Response } from "express";
import error_query from "~/db/error_query";
import path from "path";
import { QueryError } from "mysql2";
import * as util from "util";
import console from "console";

type GPX = [
  {
    path: string;
  },
];

export const getGPX = (req: Request, res: Response) => {
  try {
    const hikingId = req.params.hikingId;
    connection.query(
      `SELECT path
       FROM GPX
       WHERE hikingId = ${hikingId}`,
      (error: QueryError, results: GPX) => {
        error_query(error, res);
        const gpx = results[0].path;
        res.sendFile(path.join(__dirname, `../data/gpx/${gpx}`));
      },
    );
  } catch (error) {
    console.log("Get gpx - error");
    res.json("Get gpx error");
  }
};

type Images = {
  id: number;
}[];

export const getImages = (req: Request, res: Response) => {
  const { hikingId } = req.body;
  connection.query(
    `SELECT id
     FROM images
     WHERE hikingId = ${hikingId}
    `,
    (error, results: Images) => {
      error_query(error, res);
      res.json(results);
    },
  );
};

export const getImagesState = (req: Request, res: Response) => {
  const imagePath = req.params.path;
  res.sendFile(path.join(__dirname, `../data/hiking_image/state/${imagePath}`));
};

type Hikes = {
  id: number;
  state: string;
  path: string;
}[];

export const getHikesStates = (req: Request, res: Response) => {
  connection.query(
    `SELECT *
     FROM hikesState;`,
    (error, results: Hikes) => {
      error_query(error, res);
      res.json(results);
    },
  );
};

type HikingInformationWithoutImage = {
  main_image: number;
  state: string;
  content: string;
  indication: string;
  title: string;
  difficulty: string;
  length: number;
  elevation: number;
  duration: string;
};

type HikingImage = {
  id: number;
}[];

type HikingInformation = {
  main_image: number;
  state: string;
  content: string;
  indication: string;
  title: string;
  difficulty: string;
  length: number;
  elevation: number;
  duration: string;
  images: number[];
};

export const getHikingInformation = (req: Request, res: Response) => {
  const hikingId = req.params.hikingId;
  let hikingInformationWithoutImage: HikingInformationWithoutImage;
  connection.query(
    `SELECT hikesState.state,
            hiking.content,
            hiking.indication,
            hiking.main_image,
            hiking.title,
            difficulty.difficulty,
            hiking.length,
            hiking.elevation,
            hiking.duration
     FROM hiking
              JOIN hikesState ON hikesState.id = hiking.state_id
              JOIN difficulty ON difficulty.id = hiking.difficulty
     WHERE hiking.id = ${hikingId}`,
    (error, results: [HikingInformationWithoutImage]) => {
      error_query(error, res);
      hikingInformationWithoutImage = results[0];
    },
  );
  connection.query(
    `SELECT id
     FROM images
     WHERE hikingId = ${hikingId}
     ORDER BY order_image
    `,
    (error, results: HikingImage) => {
      error_query(error, res);
      const images = results.reduce(
        (acc: number[], curr) => [...acc, curr.id],
        [],
      );
      const hikingInformation: HikingInformation = {
        ...hikingInformationWithoutImage,
        images: images,
      };
      res.json(hikingInformation);
    },
  );
};

type SendHikingImage = [
  {
    path: string;
    hikingId: number;
  },
];

export const getHikingImage = (req: Request, res: Response) => {
  const imageId = req.params.imageId;
  connection.query(
    `SELECT path, hikingId
     FROM images
     WHERE id = ${imageId}`,
    (error, results: SendHikingImage) => {
      error_query(error, res);
      res.sendFile(
        path.join(
          __dirname,
          `../data/hiking_image/${results[0].hikingId}/${results[0].path}`,
        ),
      );
    },
  );
};

export const getHikes = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    const getHikes = util.promisify(connection.query).bind(connection);

    const hikes = (await getHikes({
      sql: `SELECT id, main_image, title, state_id
            FROM hiking
            WHERE categoriesId = ?`,
      values: [categoryId],
    })) as {
      id: number;
      main_image: number;
      title: string;
      state_id: number | null;
    }[];

    res.json(hikes);
  } catch (error) {
    console.log(`error in getHikes : ${error}`);
    res.json({ error: "getHikes error" });
  }
};

export const getHikesWithState = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const stateId = req.params.stateId;

    const getHikes = util.promisify(connection.query).bind(connection);

    const hikes = (await getHikes({
      sql: `SELECT id, main_image, title
            FROM hiking
            WHERE categoriesId = ?
              AND state_id = ?`,
      values: [categoryId, stateId],
    })) as { id: number; main_image: number; title: string }[];

    res.json(hikes);
  } catch (error) {
    console.log(`error in getHikes : ${error}`);
    res.json({ error: "getHikes error" });
  }
};

export const updateHeader = async (req: Request, res: Response) => {
  try {
    const { title, state, difficulty, hikingId } = req.body;

    const updateTitle = util.promisify(connection.query).bind(connection);
    const updateState = util.promisify(connection.query).bind(connection);
    const updateDifficulty = util.promisify(connection.query).bind(connection);

    if (title !== "") {
      await updateTitle({
        sql: `UPDATE hiking
              SET title = ?
              WHERE id = ?`,
        values: [title, hikingId],
      });
    }
    if (state !== "-1") {
      await updateState({
        sql: `UPDATE hiking
              SET state_id = ?
              WHERE id = ?`,
        values: [state, hikingId],
      });
    }
    if (difficulty !== "-1") {
      await updateDifficulty({
        sql: `UPDATE hiking
              SET difficulty = ?
              WHERE id = ?`,
        values: [difficulty, hikingId],
      });
    }

    res.json({ result: "updateHeader success" });
  } catch (error) {
    console.log(`Update header error - ${error}`);
    res.json({ error: "updateHeader error" });
  }
};

export const updateStatistical = async (req: Request, res: Response) => {
  try {
    const { distance, time, elevation, hikingId } = req.body;

    const updateStatisticalQuery = util
      .promisify(connection.query)
      .bind(connection);

    await updateStatisticalQuery({
      sql: `UPDATE hiking
            SET length    = ?,
                duration  = ?,
                elevation = ?
            WHERE id = ?`,
      values: [distance, time, elevation, hikingId],
    });
    res.json({ result: "update statistical success" });
  } catch (error) {
    console.log(`update statistical error - ${error}`);
    res.json({ error: "update statistical error" });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { indication, description, hikingId } = req.body;

    const updateDescriptionQuery = util
      .promisify(connection.query)
      .bind(connection);
    const updateIndicationQuery = util
      .promisify(connection.query)
      .bind(connection);

    if (indication !== "") {
      await updateIndicationQuery({
        sql: "UPDATE hiking SET indication = ? WHERE id = ?",
        values: [indication, hikingId],
      });
    }

    if (description !== "") {
      await updateIndicationQuery({
        sql: "UPDATE hiking SET content = ? WHERE id = ?",
        values: [description, hikingId],
      });
    }

    res.json({ result: "update content success" });
  } catch (error) {
    console.log(`update content error - ${error}`);
    res.json({ error: "update content error" });
  }
};

export const reorderImages = async (req: Request, res: Response) => {
  try {
    const { images }: { images: number[] } = req.body;

    const reorderQuery = util.promisify(connection.query).bind(connection);

    for (let i = 0; i < images.length; i++) {
      await reorderQuery({
        sql: `UPDATE images
              SET order_image = ?
              WHERE id = ?`,
        values: [i + 1, images[i]],
      });
    }
    res.json({ result: "reorder image success" });
  } catch (error) {
    console.log(`reorder error : ${error}`);
    res.json({ error: "reorder error" });
  }
};

export const downloadImages = async (req: Request, res: Response) => {
  try {
    if (req.fileName) {
      const uploadImageQuery = util
        .promisify(connection.query)
        .bind(connection);
      const getMaxNumber = util.promisify(connection.query).bind(connection);

      const maxNumber = (await getMaxNumber({
        sql: `SELECT Max(order_image)
              FROM images
              WHERE hikingId = ?`,
        values: [req.params.hikingId],
      })) as [{ "Max(order_image)": number }];

      const max = maxNumber[0]["Max(order_image)"];

      req.fileName.forEach((image, index) => {
        uploadImageQuery({
          sql: `INSERT INTO images (path, hikingId, order_image)
                VALUES (?, ?, ?)`,
          values: [image, req.params.hikingId, max + index],
        });
      });
    }
    res.json({ result: "success" });
  } catch (error) {
    console.log("download image error");
    res.json({ error: "download image error" });
  }
};

export const updateMainImage = async (req: Request, res: Response) => {
  try {
    const { hikingId, mainImage } = req.body;

    const updateMainImageQuery = util
      .promisify(connection.query)
      .bind(connection);

    await updateMainImageQuery({
      sql: `UPDATE hiking
            SET main_image = ?
            WHERE id = ?`,
      values: [mainImage, hikingId],
    });

    res.json({ result: "Edit Main Image success" });
  } catch (error) {
    console.log(`error in edit Main Image : ${error}`);
    res.json({ error: "Edit Main Image" });
  }
};
