import connection from "~/db/database_connection";
import {Request, Response} from "express";
import error_query from "~/db/error_query";
import console from "console";
import path from "path";
import {QueryError} from "mysql2";

type GPX = [{
  path: string
}]

export const getGPX = ((req: Request, res: Response) => {
  const hikingId = req.params.hikingId
  connection.query(`SELECT path
                    FROM GPX
                    WHERE hikingId = ${hikingId}`, (error: QueryError, results: GPX) => {
    error_query(error, res)
    const gpx = results[0].path
    res.sendFile(path.join(__dirname, `../data/gpx/${gpx}`))
  })
})

type Images = {
  id: number
}[]

export const getImages = ((req: Request, res: Response) => {
  const {hikingId} = req.body
  connection.query(`SELECT id
                    FROM images
                    WHERE hikingId = ${hikingId}
  `, (error, results: Images) => {
    error_query(error, res)
    res.json(results)
  })
})

export const getImagesState = ((req: Request, res: Response) => {
  const imagePath = req.params.path
  res.sendFile(path.join(__dirname, `../data/hiking_image/state/${imagePath}`))
})

type Hikes = {
  id: number;
  state: string;
  path: string;
}[]

export const getHikesStates = ((req: Request, res: Response) => {
  connection.query(`SELECT *
                    FROM hikesState;`, (error, results: Hikes) => {
    error_query(error, res);
    res.json(results);
  })
})

type HikingInformationWithoutImage = {
  main_image: number,
  state: string,
  content: string,
  indication: string,
  title: string,
  difficulty: string,
  length: number,
  elevation: number,
  duration: string
}

type HikingImage = {
  id: number
}[]

type HikingInformation = {
  main_image: number,
  state: string,
  content: string,
  indication: string,
  title: string,
  difficulty: string,
  length: number,
  elevation: number,
  duration: string,
  images: number[]
}

export const getHikingInformation = ((req: Request, res: Response) => {
  const hikingId = req.params.hikingId
  let hikingInformationWithoutImage: HikingInformationWithoutImage;
  connection.query(`SELECT hikesState.state,
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
                    WHERE hiking.id = ${hikingId}`, (error, results: [HikingInformationWithoutImage]) => {
    error_query(error, res)
    hikingInformationWithoutImage = results[0]
  })
  connection.query(`SELECT id
                    FROM images
                    WHERE hikingId = ${hikingId}`, (error, results: HikingImage) => {
    error_query(error, res)
    const images = results.reduce((acc: number[], curr) => [...acc, curr.id], [])
    const hikingInformation: HikingInformation = {...hikingInformationWithoutImage, images: images}
    res.json(hikingInformation)
  })
})

type SendHikingImage = [{
  path: string,
  hikingId: number
}]

export const getHikingImage = ((req: Request, res: Response) => {
  const imageId = req.params.imageId
  connection.query(`SELECT path, hikingId
                    FROM images
                    WHERE id = ${imageId}`, (error, results: SendHikingImage) => {
    error_query(error, res)
    res.sendFile(path.join(__dirname, `../data/hiking_image/${results[0].hikingId}/${results[0].path}`))
  })
})