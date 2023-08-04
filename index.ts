import 'dotenv/config';

import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';

import routers from './src/routers';

const app: Express = express();
const port: any = process.env.APP_PORT || 3000;

app.use(cors());
// tracking responses
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json()); // parse json body
app.use(express.urlencoded({ extended: false })); // accept x-url-encoded
app.disable("x-powered-by"); // disable "powered by" header

app.use(routers);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
