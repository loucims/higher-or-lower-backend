
import OptionController from "../controllers/OptionController.js";
import { firebaseController } from "../dbConnection/dbConnection.js";
import { Option } from "../Models/Option.js"
import {Router} from "express";



const optionRoutes = Router();
const optionController = new OptionController(firebaseController)

optionRoutes.get("/optionsPaginated", 
    async function (request,response) {
        try {
            const {genre, limit, startAfterKey} = request.body;
            const data = await optionController.getOptionsByGenrePaginated(genre, limit, startAfterKey);
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    }
);

optionRoutes.post("/create",
    async function (request, response) {
        try {
            const {title, value, image, genre} = request.body;
            const option = new Option(title, value, image);
            const data = await optionController.createOption(option, genre);
            response.status(200).send({success: true, message: data});
        } catch (error) {
            response.status(400).send({success: false, message: error});
        }
    }
);

export default optionRoutes;  