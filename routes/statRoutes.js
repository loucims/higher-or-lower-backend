import {Router} from "express";
import { validateLogin } from "../middlewares/validateLogin.js";
import StatController from "../controllers/StatController.js";
import { validatePositiveNumber } from "../middlewares/middlewares.js";

const statController = new StatController()

const statRoutes = Router();


statRoutes.use(validateLogin);
statRoutes.use(validatePositiveNumber);

statRoutes.put("/:id", statController.updateRecordNormal);
statRoutes.put("/:id", statController.updateRecordTimer);
statRoutes.put("/:id", statController.updateTotalGuesses);


export default statRoutes;  