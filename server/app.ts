import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { rateLimitServer, corsConfig } from "./middlewares/middlewares-app";
import { router } from "./routes/user-route";

export const app = express();

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(corsConfig);
app.use(rateLimitServer);
app.use("", router);
