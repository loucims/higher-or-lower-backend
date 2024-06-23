import {Router} from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import {logger} from "../middlewares/middlewares.js";
import optionRoutes from "./optionRoutes.js";

const routes = Router();


routes.use("/user", logger, userRoutes);
routes.use("/post", postRoutes);
routes.use("/options", optionRoutes)

export default routes;
