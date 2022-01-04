import * as express from "express";
import { RoutesController } from "../controller/router-controller";

const controller = new RoutesController;

const router = express.Router();

router.post("/users/get", controller.routePostUserGet);

router.post("/createtoken", controller.routerPostCrateToken);

router.get("/verifyauth/:token", controller.routerVerifyAuth);

router.post("/users", controller.routerPostUser);

router.post("/updateuser", controller.routerUpdateUser);

router.post("/deleteuser", controller.routerDeleteUser);

export { router };
