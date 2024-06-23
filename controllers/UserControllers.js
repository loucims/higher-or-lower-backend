import {Stat, User} from "../Models/index.js";
import { generateToken, validateToken } from "../utils/tokens.js";
import { firebaseController } from "../dbConnection/dbConnection.js";



class UserControllers{

    createUser = async (req, res) =>{
        try {
            const{userName, password, mail}=req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await User.create({userName, password: hashedPassword, mail});

            await Stats.create({
                userId: user.id,
                recordNormal: 0,
                recordTimer: 0,
                totalGuesses: 0,
              });

            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
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
            const data = await User.findOne({where:{ mail }});
            if(data===0) throw new Error("Datos incorrectos");

            const comparePassword = await data.validatePassword(password);
            if(comparePassword===false) throw new Error("Datos incorrectos");

            const payload = {
                id: data.id,
                name: data.userName,
            };

            const token = generateToken(payload);
            res.cookie("Token", token);

            res.status(200).send({success: true, message:"Usuario logueado con exito"});
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


}

export default UserControllers;