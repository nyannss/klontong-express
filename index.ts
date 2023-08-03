import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';

import routers from './src/routers';

dotenv.config();

const app: Express = express();
const port : any = process.env.APP_PORT || 3000;


app.use(express.json());
// accept x-url-encoded
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by'); // disable "powered by" header

// tracking responses
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );


app.use(routers);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});