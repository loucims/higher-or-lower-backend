import dbConnection from "../dbConnection/dbConnection.js";
import User from "../Models/User.js";


class UserControllers{

    getAllUsers = async (req, res) =>{
        try {
            const query = "SELECT userName FROM users";
            const [data] = await dbConnection.query(query);
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };
}

export default UserControllers;