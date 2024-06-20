import {User} from "../Models/index.js";
import { FirebaseController } from "../dbConnection/firebaseController.js";
import { Option } from "../Models/Option.js";
import { blurhashFromURL } from "blurhash-from-url";

class OptionController {
    /**
     * @param {FirebaseController} firebaseController - An instance of FirebaseController
    */
    constructor(firebaseController) {
        this.firebaseController = firebaseController
    }

    /**
    * @param {Option} option - An instance of Option
    */
    async createOption(option, genre = 'movies') {
        const path = `options/${genre}`

        if (option.image) {
            option.blurhash = await blurhashFromURL(option.image, 32, 32)
        }

        console.log(option)
        const newKey = await this.firebaseController.pushData(path, option)
        await this.firebaseController.setData(`${path}/${newKey}/id`, newKey)

        return newKey
    }

    async getOptionsByGenrePaginated(genre, limit, startAfterKey = undefined) {
        let path = `/options/${genre}`;
        let dataMap = await this.databaseController.getDataPaginated(path, limit, startAfterKey)

        let lastKey = null;
        let options = []
        for (let key in dataMap) {
            let option = dataMap[key];

            if (option.id !== undefined) {
                options.push(option);
                lastKey = key;
            }
        }

        return { data: options, lastKey: lastKey };
    }

}

export default OptionController;