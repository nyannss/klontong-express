import {
  Request,
  Response,
  Router,
} from 'express';

import authRouter from './auth.router';

const routers: Router = Router();

routers.use("/auth", authRouter);

routers.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    msg: "Welcome to Rest API kelontong app!",
    contributors: [
      {
        alias: "nyannss",
        github: "https://github.com/nyannss",
      },
    ],
  });
});

export default routers;
