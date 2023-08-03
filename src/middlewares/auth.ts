import {
  NextFunction,
  Request,
  Response,
} from 'express';

import prisma from '../config/prisma';

async function check(req: Request, res: Response, next: NextFunction) {
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

  // jwt.verify(token, env.JWT_SECRET_KEY, (err, payload: JwtPayload) => {
  //   if (err && err.name)
  //     return res.status(403).json({
  //       // err handling
  //       status: 403,
  //       msg: err.message,
  //     });
  //   if (err)
  //     return res.status(500).json({
  //       status: 500,
  //       msg: "Internal Server Error",
  //     });
  //     req.authInfo = payload;
  //     next();
  //   });
}

export default {
  check,
};
