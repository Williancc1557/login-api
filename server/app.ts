
import * as express from 'express';
import { router } from './routes/userRoute';
import * as bodyparser from 'body-parser'
import * as rateLimit from "express-rate-limit";
import * as logger from "morgan";
import * as cors from "cors";
import { rateLimitServer, corsConfig } from './middlewares/middlewaresApp';
import * as bodyParser from 'body-parser';


export const app = express();

app.use(bodyParser.json())
app.use(logger("dev"))
app.use(corsConfig)
app.use(rateLimitServer)
app.use('', router)
