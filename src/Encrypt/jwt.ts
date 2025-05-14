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

  if (!token) {
    console.error('No token found');
    return
  };

  const decodedToken = decodeToken(token);
  if (!decodedToken || typeof decodedToken === 'string') {
    console.error('Token is not valid');
    return
  };
  return decodedToken.email;
}