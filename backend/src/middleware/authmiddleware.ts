import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sdffgk;jnbfmgde";

export const authmiddleware = (req: Request,res: Response,next: NextFunction) => {
  try {
    //@ts-ignore
    const token:string  = req.headers.Authorization;
    const istoken = jwt.verify(token, JWT_SECRET);

    console.log("middleware" + istoken);

    if (istoken) {
      //@ts-ignore
      req.userId = istoken.id;
      next();
    } else {
      
      res.status(403).json({
        msg: "token is not present ",
      });
    }
  } catch (error) {}
};
