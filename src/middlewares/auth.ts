import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import env from '../config/env';
import prisma from '../config/prisma';
import { CustomRequest } from '../types/request';

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
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
}

async function admin(req: Request, res: Response, next: NextFunction) {
  const uInfo = (req as CustomRequest).token;
  // console.log(userRole);

  if (typeof uInfo !== "object" || uInfo.role !== "ADMIN") {
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
