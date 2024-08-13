import * as jwt from 'jsonwebtoken';
import console from "console";
import {Request, Response} from "express";


export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded?.payload
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getEmailByReq = (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return;

  const decodedToken = decodeToken(token);
  if (!decodedToken || typeof decodedToken === 'string') return;
  return decodedToken.email;
}