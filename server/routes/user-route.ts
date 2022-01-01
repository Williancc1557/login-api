import * as express from "express";
import { RoutesController } from "../controller/router-controller";

const router = express.Router();

router.post("/users/get", new RoutesController().routePostUserGet);

router.post("/createtoken", new RoutesController().routerPostCrateToken);

router.get("/verifyauth/:token", new RoutesController().routerVerifyAuth);

router.post("/users", new RoutesController().routerPostUser);

router.post("/deleteuser", new RoutesController().routerDeleteUser);

export { router };
