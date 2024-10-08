import { createNewConnection } from "~/db/database_connection";
import { Request, Response } from "express";
import error_query from "~/db/error_query";
import path from "path";
import { QueryError } from "mysql2";
import * as util from "util";
import fs from "fs";
import sharp from "sharp";
import process from "process";
import {getEmailByReq} from "~/Encrypt/jwt";

const unlinkAsync = util.promisify(fs.unlink);
const copyFileAsync = util.promisify(fs.copyFile);

type GPX = [
  {
    path: string;
  },
];

export const getGPX = (req: Request, res: Response) => {
  try {
    const connection = createNewConnection();
    const hikingId = req.params.hikingId;
    connection.query(
      `SELECT path
       FROM GPX
       WHERE hikingId = ${hikingId}`,
      (error: QueryError, results: GPX) => {
        error_query(error, res);
        if (!results[0]) {
          res.json("Get gpx error");
          connection.end();
          return;
        }
        const gpx = results[0].path;

        res.setHeader("Content-Disposition", `attachment; filename=${gpx}`);
        res.setHeader("Content-Type", "application/gpx+xml");
        res.sendFile(
          path.join(process.env.PATH_DATA || "", `GPX/${gpx}`),
        );
      },
    );
    connection.end();
  } catch (error) {
    console.log("Get gpx - error");
    res.json("Get gpx error");
  }
};

type Images = {
  id: number;
}[];

export const getImages = (req: Request, res: Response) => {
  try {
    const { hikingId } = req.body;
    const connection = createNewConnection();
    connection.query(
      `SELECT id
       FROM images
       WHERE hikingId = ${hikingId}
      `,
      (error: QueryError, results: Images) => {
        error_query(error, res);
        res.json(results);
      },
    );
    connection.end();
  } catch (e) {
    console.log(`error in getImages : ${e}`);
    res.status(500).json({ error: "getImages error" });
  }
};

export const getImagesState = (req: Request, res: Response) => {
  try {
    const imagePath = req.params.path;
    res.sendFile(
      path.join(
        process.env.PATH_DATA || "",
        `/hiking_image/state/${imagePath}`,
      ),
    );
  } catch (e) {
    console.log(`GetImagesState error : ${e}`);
    res.status(500).json({ error: "getImagesState error" });
  }
};

type Hikes = {
  id: number;
  state: string;
  path: string;
}[];

export const getHikesStates = (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const connection = createNewConnection();
    connection.query(
      `SELECT *
       FROM hikesState
       WHERE categoryId = ${categoryId};`,
      (error: QueryError, results: Hikes) => {
        error_query(error, res);
        res.json(results);
      },
    );
    connection.end();
  } catch (e) {
    console.log(`error in getHikesStates : ${e}`);
    res.status(500).json({ error: "getHikesStates error" });
  }
};

type HikingInformationWithoutImage = {
  main_image: number;
  main_image_position: number;
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
  main_image_position: number;
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
  try {
    const hikingId = req.params.hikingId;
    let hikingInformationWithoutImage: HikingInformationWithoutImage;
    const connection = createNewConnection();
    connection.query(
      `SELECT hikesState.state,
              hiking.content,
              hiking.indication,
              hiking.main_image,
              hiking.main_image_position,
              hiking.title,
              difficulty.difficulty,
              hiking.length,
              hiking.elevation,
              hiking.duration
       FROM hiking
                JOIN hikesState ON hikesState.id = hiking.state_id
                JOIN difficulty ON difficulty.id = hiking.difficulty
       WHERE hiking.id = ${hikingId}`,
      (error: QueryError, results: [HikingInformationWithoutImage]) => {
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
      (error: QueryError, results: HikingImage) => {
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
    connection.end();
  } catch (e) {
    console.log(`error in getHikingInformation : ${e}`);
    res.status(500).json({ error: "getHikingInformation error" });
  }
};

type SendHikingImage = [
  {
    path: string;
    hikingId: number;
  },
];

export const getHikingImage = (req: Request, res: Response) => {
  try {
    const imageId = req.params.imageId;

    if (imageId === "undefined") {
      return res.sendFile(
        path.join(
          // process.env.PATHCTR || "",
          process.env.PATH_DATA || "",
          `hiking_image/default.png`,
        ),
      );
    }

    const connection = createNewConnection();
    connection.query(
      `SELECT path, hikingId
       FROM images
       WHERE id = ${imageId}`,
      (error: QueryError, results: SendHikingImage) => {
        error_query(error, res);
        if (results[0]) {
          res.sendFile(
            path.join(
              process.env.PATH_DATA || "",
              `/hiking_image/${results[0].hikingId}/${results[0].path}`,
            ),
          );
        } else {
          res.sendFile(
            path.join(
              process.env.PATH_DATA || "",
              `hiking_image/default.png`,
            ),
          );
        }
      },
    );
    connection.end();
  } catch (error) {
    console.log(`error in send image : ${error}`);
    res.json({ error: "error in send image" });
  }
};

export const getHikes = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    const connection = createNewConnection();
    const getHikes = util.promisify(connection.query).bind(connection);

    const hikes = (await getHikes({
      sql: `SELECT id, main_image, title, state_id
            FROM hiking
            WHERE categoriesId = ?
            ORDER BY title`,
      values: [categoryId],
    })) as {
      id: number;
      main_image: number;
      title: string;
      state_id: number | null;
    }[];

    res.json(hikes);
    connection.end();
  } catch (error) {
    console.log(`error in getHikes : ${error}`);
    res.json({ error: "getHikes error" });
  }
};

export const getHikesWithState = async (req: Request, res: Response) => {
  try {
    const { categoryId, stateId } = req.params;

    const connection = createNewConnection();
    const getHikes = util.promisify(connection.query).bind(connection);

    const hikes = (await getHikes({
      sql: `SELECT id, main_image, title
            FROM hiking
            WHERE categoriesId = ?
              AND state_id = ?`,
      values: [categoryId, stateId],
    })) as { id: number; main_image: number; title: string }[];

    res.json(hikes);
    connection.end();
  } catch (error) {
    console.log(`error in getHikes : ${error}`);
    res.json({ error: "getHikes error" });
  }
};

export const updateHeader = async (req: Request, res: Response) => {
  try {
    const { title, state, difficulty, hikingId } = req.body;

    const connection = createNewConnection();
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
    connection.end();
  } catch (error) {
    console.log(`Update header error - ${error}`);
    res.json({ error: "updateHeader error" });
  }
};

export const updateMainImagePosition = async (req: Request, res: Response) => {
  try {
    const { hikingId, newPosition } = req.body;

    const connection = createNewConnection();
    const updateQuery = util.promisify(connection.query).bind(connection);

    await updateQuery({
      sql: `
          UPDATE hiking
          SET main_image_position = ?
          WHERE id = ?
      `,
      values: [newPosition, hikingId],
    });

    console.log(`update main image position (id : ${hikingId}) with success`);
    res.json({ result: "finish with success" });
    connection.end();
  } catch (e) {
    console.log(`update main image position error : ${e}`);
    res.json({ error: `update main image position error : ${e}` });
  }
};

export const updateStatistical = async (req: Request, res: Response) => {
  try {
    const { distance, time, elevation, hikingId } = req.body;

    const connection = createNewConnection();
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
    connection.end();
  } catch (error) {
    console.log(`update statistical error - ${error}`);
    res.json({ error: "update statistical error" });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { indication, description, hikingId } = req.body;

    const connection = createNewConnection();
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
      await updateDescriptionQuery({
        sql: "UPDATE hiking SET content = ? WHERE id = ?",
        values: [description, hikingId],
      });
    }

    res.json({ result: "update content success" });
    connection.end();
  } catch (error) {
    console.log(`update content error - ${error}`);
    res.json({ error: "update content error" });
  }
};

export const reorderImages = async (req: Request, res: Response) => {
  try {
    const { images }: { images: number[] } = req.body;

    const connection = createNewConnection();
    const reorderQuery = util.promisify(connection.query).bind(connection);

    for (let i = 0; i < images.length; i++) {
      await reorderQuery({
        sql: `UPDATE images
              SET order_image = ?
              WHERE id = ?`,
        values: [i + 1, images[i]],
      });
    }
    connection.end();
    res.json({ result: "reorder image success" });
  } catch (error) {
    console.log(`reorder error : ${error}`);
    res.json({ error: "reorder error" });
  }
};

export const downloadImages = async (req: Request, res: Response) => {
  try {
    if (req.files) {
      const connection = createNewConnection();
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

      const images = req.files as Express.Multer.File[];
      images.forEach((image, index) => {
        uploadImageQuery({
          sql: `INSERT INTO images (path, hikingId, order_image)
                VALUES (?, ?, ?)`,
          values: [`${image.filename}`, req.params.hikingId, max + index],
        });

        const resize = async () => {
          const tempImagePath = image.path + ".temp";
          await copyFileAsync(image.path, tempImagePath);

          const imageTemp = sharp(tempImagePath);
          await imageTemp.resize(3000);
          await imageTemp.toFile(image.path);
          await unlinkAsync(tempImagePath);
        };

        try {
          void resize();
          console.log("resize success");
          res.json({ result: "success" });
        } catch (e) {
          console.log(`error in resize image : ${e}`);
          res.status(500).json({ error: `resize image error : ${e}` });
        }
      });
      connection.end();
      console.log("end connection");
    }
  } catch (error) {
    console.log("download image error");
    res.json({ error: "download image error" });
  }
};

export const updateMainImage = async (req: Request, res: Response) => {
  try {
    const { hikingId, mainImage } = req.body;

    const connection = createNewConnection();
    const updateMainImageQuery = util
      .promisify(connection.query)
      .bind(connection);

    await updateMainImageQuery({
      sql: `UPDATE hiking
            SET main_image = ?
            WHERE id = ?`,
      values: [mainImage, hikingId],
    });

    connection.end();
    res.json({ result: "Edit Main Image success" });
  } catch (error) {
    console.log(`error in edit Main Image : ${error}`);
    res.json({ error: "Edit Main Image" });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { imageId, hikingId } = req.body;

    const connection = createNewConnection();
    const getImagePath = util.promisify(connection.query).bind(connection);
    const deleteInDB = util.promisify(connection.query).bind(connection);

    const filePath = (await getImagePath({
      sql: `SELECT path
            FROM images
            WHERE id = ?`,
      values: [imageId],
    })) as [{ path: string }];

    const fullPath = path.join(
      process.env.PATH_DATA || "",
      "hiking_image",
      hikingId.toString(),
      filePath[0].path,
    );

    await deleteInDB({
      sql: `DELETE
            FROM images
            WHERE id = ?`,
      values: [imageId],
    });

    fs.unlinkSync(fullPath);

    connection.end();
    res.json({ result: "image delete with success" });
  } catch (error) {
    console.log(`delete image error : ${error}`);
    res.json({ error: "delete image error" });
  }
};

export const uploadNewGpx = async (req: Request, res: Response) => {
  try {
    const hikingId = req.params.hikingId;
    const gpxName = req.gpxFileName;

    if (!gpxName) {
      res.json({ error: "upload new gpx error with gpxName" });
      return;
    }

    const connection = createNewConnection();
    const getLastName = util.promisify(connection.query).bind(connection);
    const updatePath = util.promisify(connection.query).bind(connection);
    const insertGpx = util.promisify(connection.query).bind(connection);

    const lastName = (await getLastName({
      sql: `SELECT path
            FROM GPX
            WHERE hikingId = ?`,
      values: [hikingId],
    })) as [{ path: string }];

    if (lastName[0]) {
      await updatePath({
        sql: `UPDATE GPX
              SET path = ?
              WHERE hikingId = ?`,
        values: [gpxName, hikingId],
      });

      if (lastName[0].path !== gpxName) {
        const fullPath = path.join(process.env.PATH_DATA || "", "/GPX", lastName[0].path);

        fs.unlinkSync(fullPath);
      }
    } else {
      await insertGpx({
        sql: `INSERT INTO GPX (path, hikingId)
              VALUES (?, ?)`,
        values: [gpxName, hikingId],
      });
    }

    res.json({ result: "upload new gpx success" });
    connection.end();
  } catch (error) {
    console.log(`upload new gpx error: ${error}`);
    res.json({ error: "upload new gpx error" });
  }
};

export const createAlbum = async (req: Request, res: Response) => {
  try {
    const { title, difficulty, state, categoryId } = req.body;

    const connection = createNewConnection();
    const getMaxId = util.promisify(connection.query).bind(connection);
    const createAlbumQuery = util.promisify(connection.query).bind(connection);

    await createAlbumQuery({
      sql: `INSERT INTO hiking (title, categoriesId, content, state_id, difficulty, length, elevation,
                                duration, indication)
            VALUES (?, ?, '', ?, ?, 0, 0, '', '')`,
      values: [title, categoryId, state, difficulty],
    });

    const maxId = (await getMaxId({
      sql: `SELECT MAX(id)
            FROM hiking`,
    })) as [{ "MAX(id)": number }];

    res.json({ hikingId: maxId[0]["MAX(id)"] });
    connection.end();
  } catch (error) {
    console.log(`error in create album - ${error}`);
    res.json({ error: "error in create album" });
  }
};

export const getFavorite = async (req: Request, res: Response) => {
  try {
    const email = getEmailByReq(req, res);
    if (!email) return res.json([])

    const connection = createNewConnection();
    const getFavoriteQuery = util.promisify(connection.query).bind(connection);

    const favorites = (await getFavoriteQuery({
      sql: `SELECT hiking.id, main_image, title, state_id
            FROM hiking
                     RIGHT JOIN favorite ON favorite.hikingId = hiking.id
            WHERE favorite.userId = ?
            ORDER BY title

      `,
      values: [email],
    })) as {
      id: number;
      main_image: number;
      title: string;
      state_id: number;
    }[];

    res.json(favorites);
    connection.end();
  } catch (e) {
    console.log(`error in getFavorite : ${e}`);
    res.json({ error: "error in getFavorite" });
  }
};

export const getAllHikes = async (_req: Request, res: Response) => {
  try {
    const connection = createNewConnection();
    const getAllHikingQuery = util.promisify(connection.query).bind(connection);

    const temp = util.promisify(connection.query).bind(connection);

    await temp({
      sql: `SELECT *
            FROM hiking
            WHERE id = ?`,
      values: [undefined],
    });

    const allHiking = await getAllHikingQuery({
      sql: `SELECT hiking.id, title, state, difficulty.difficulty, state_id, hiking.categoriesId
            FROM hiking
                     LEFT JOIN hikesState ON hiking.state_id = hikesState.id
                     LEFT JOIN difficulty ON hiking.difficulty = difficulty.id
            ORDER BY title`,
    });

    res.json(allHiking);
    connection.end();
  } catch (e) {
    console.log(`error in getAllHiking : ${e}`);
    res.json({ error: `getAllHiking - ${e}` });
  }
};

export const rotateImage = async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params;
    if (!imageId) {
      return res.status(400).json({ error: "imageId is required" });
    }

    const connection = createNewConnection();
    const getPath = util.promisify(connection.query).bind(connection);

    const imageInformation = (await getPath({
      sql: `SELECT hikingId, path
            FROM images
            WHERE id = ?`,
      values: [imageId],
    })) as [{ hikingId: number; path: string }] | [];

    if (imageInformation.length === 0) {
      connection.end();
      return res.status(400).json({ error: "imageId isn't valid" });
    }

    const imageUrl = path.join(
      process.env.PATH_DATA || "",
      `/hiking_image/${imageInformation[0].hikingId}/${imageInformation[0].path}`,
    );

    try {
      const tempImagePath = imageUrl + ".temp";
      await copyFileAsync(imageUrl, tempImagePath);

      const image = sharp(tempImagePath);
      await image.rotate(90);
      await image.toFile(imageUrl);
      await unlinkAsync(tempImagePath);

      connection.end();
      res.json({ result: "Image rotated and replaced successfully." });
    } catch (e) {
      res
        .status(500)
        .json({ error: "Unable to rotate and replace the image." });
    }
  } catch (e) {
    console.log(`error in rotate image : ${e}`);
    res.status(500).json({ error: `error in rotate image : ${e}` });
  }
};
