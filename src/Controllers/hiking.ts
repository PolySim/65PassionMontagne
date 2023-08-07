import connection from "~/db/database_connection";
import {Request, Response} from "express";
import error_query from "~/db/error_query";
import console from "console";
import mysql from "mysql2";

const path = require('path')

export const getHikingInformation = ((req: Request, res: Response) => {
  const {categoriesId} = req.body
  connection.query(`SELECT title, content
                    FROM hiking
                    WHERE categoriesId = ${categoriesId}`, (error, results, fields) => {
    error_query(error, res)
    res.json(results);
  })
})

export const getGPX = ((req: Request, res: Response) => {
  const {hikingId} = req.body
  connection.query(`SELECT path
                    FROM GPX
                    WHERE hikingId = ${hikingId}`, (error, results: mysql.RowDataPacket[]) => {
    error_query(error, res)
    const gpx = results[0].path
    res.sendFile(path.join(__dirname, `../data/gpx/${gpx}`))
  })
})

export const getImages = ((req: Request, res: Response) => {
  const {hikingId} = req.body
  connection.query(`SELECT id
                    FROM images
                    WHERE hikingId = ${hikingId}
  `, (error, results: mysql.RowDataPacket[]) => {
    error_query(error, res)
    res.json(results)
  })
})