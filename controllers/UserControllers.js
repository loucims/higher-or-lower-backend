import {Stat, User} from "../Models/index.js";
import { generateToken, validateToken } from "../utils/tokens.js";
import { firebaseController } from "../dbConnection/dbConnection.js";



class UserControllers{

    createUser = async (req, res) =>{
        try {
            const{userName, password, mail}=req.body;

            const user = await User.create({
                userName: userName, 
                password: password, 
                mail: mail
            });

            await Stat.create({
                userId: user.id,
                recordNormal: 0,
                recordTimer: 0,
                totalGuesses: 0,
            });

            res.status(200).send({success: true, message: user});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };


    getAllUsers = async (req, res) =>{
        try {
            const [data] = await User.findAll({
                attributes:["userName"],
                include:[
                    {
                        model: Stat,
                        attributes:["recordNormal"],
                    },
                ],
            });
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };

    getUserById = async (req, res) =>{
        try {
            const {id} = req.params;
            const data = await User.findOne({
               where: {
                id,
               },
                attributes:["userName", "mail"],
                include:[
                    {
                        model: Stat,
                        attributes:["recordNormal", "recordTimer", "totalGuesses"],
                    },
                ],
            });
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };


    updateUser = async (req, res) =>{
        try {
            const {id} = req.params;
            const{userName, mail}=req.body;
            const user=await User.findOne({
                where: {
                 id,
                },
                 attributes:["userName", "mail"],
             });
             if(user==null) throw Error ("No existe el usuario a actualizar")
            const data = await User.update({userName, mail}, {where:{ id }});
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };


    deleteUser = async (req, res) =>{
        try {
            const {id} = req.params;
            const data = await User.destroy({where:{ id }});

            if(data===0) throw new Error("El usuario a eliminar no existe");
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };

    login = async (req, res) =>{
        try {
            const {mail, password} = req.body;
            const user = await User.findOne({where:{ mail }});
            if(user===0) throw new Error("Email incorrecto");

            const isPasswordValid = await user.validatePassword(password);
            console.log("Password valid:", isPasswordValid);
            if (!isPasswordValid) throw new Error("Password incorrecto");

            const payload = {
                id: user.id,
                name: user.userName,
            };

            const token = generateToken(payload);
            res.cookie("Token", token);

            res.status(200).send({success: true, message: token});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };


    
    profile = async(req, res)=>{
        try {
            const {user}=req
            res.status(200).send({success: true, message: user});
        } catch (error) {
            res.status(400).send({success:false, message: error.message});
        }
    };


    getLeaderboardUsers = async (req, res) => {
        try {
            const data = await User.findAll({
                attributes: ["userName"],
                include: [
                    {
                        model: Stat,
                        as: 'stat', // Ensure this alias matches the association alias
                        attributes: ["recordNormal"],
                    }
                ],
                // Ensure order is properly defined without using request parameters
                order: [[{ model: Stat, as: 'stat' }, 'recordNormal', 'DESC']],
                limit: 5
            });
    
            console.log("Fetched data:", JSON.stringify(data, null, 2)); // Log the fetched data


            res.status(200).send({ success: true, message: data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };

}

export default UserControllers;