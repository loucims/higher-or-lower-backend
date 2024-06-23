import {Router} from "express";
import userRoutes from "./userRoutes.js";
import statRoutes from "./statRoutes.js";
import {logger} from "../middlewares/middlewares.js";

const routes = Router();


routes.use("/user", logger, userRoutes);
routes.use("/stat", statRoutes);

export default routes;
