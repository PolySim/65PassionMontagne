import express, { Request, Response } from "express";
import path from "path";
import console from "console";

export const sendMain = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
};

export const sendStatic = (req: Request, res: Response) => {
  const fileName = req.params.fileName;
  res.sendFile(path.join(__dirname, "../dist/assets", fileName));
};

export const sendImageStatic = (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  res.sendFile(path.join(__dirname, "../dist/Home", fileName));
};
