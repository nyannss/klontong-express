import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import env from '../config/env';
import prisma from '../config/prisma';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

async function check(req: Request, res: Response, next: NextFunction) {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken)
      return res.status(403).json({
        status: 403,
        msg: "Access denied! Not logged in",
      });

    const token = bearerToken.split(" ")[1];
    const tokenVerify = await prisma.token.findUnique({
      where: {
        token,
      },
    });

    if (!tokenVerify) {
      return res.status(403).json({
        status: 403,
        msg: "JWT Rejected",
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

    (req as CustomRequest).token = decoded;
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
}

async function admin(req: Request, res: Response, next: NextFunction) {
  const userRole = (req as CustomRequest).token;
  if (typeof userRole !== "object" || userRole.token !== "ADMIN") {
    return res.status(403).json({
      status: 403,
      msg: "Access denied! Role not authorized",
    });
  }
  next();
}

export default {
  check,
  admin,
};
