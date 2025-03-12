import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sdffgk;jnbfmgde";

interface tokenInterface {
  id: string;
}

export const authmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(403).json({ msg: "token is not present " });
      return;
    }

    const istoken = jwt.verify(token, JWT_SECRET) as tokenInterface;

    if (istoken) {
      req.userId = istoken.id;
      next();
    }
  } catch (error) {}
};
