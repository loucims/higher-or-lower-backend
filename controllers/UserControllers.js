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
            res.status(400).send({success: false, message: "Error al crear el usuario (El email no puede ya existir)"});
        }
    };


    getAllUsers = async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ["userName"],
                include: [
                    {
                        model: Stat,
                        as: 'stat',
                        attributes: ["recordNormal", "recordTimer", "totalGuesses"],
                    },
                ],
            });
    
            res.status(200).send({ success: true, message: users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(400).send({ success: false, message: error.message });
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
                        as: 'stat',
                        attributes:["recordNormal", "recordTimer", "totalGuesses"],
                    },
                ],
            });
            if (data==null) throw Error ("No existe el usuario")
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
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
            const result = await User.update({userName, mail}, {where:{ id }});
            if (result[0]==0) throw Error ("No se ha podido actualizar el usuario")
            const updatedUser = await User.findOne({
                where: {
                 id,
                },
                 attributes:["userName", "mail"],
             });
            res.status(200).send({success: true, message: updatedUser});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };


    deleteUser = async (req, res) =>{
        try {
            const {id} = req.params;
            const data = await User.destroy({where:{ id }});

            if(data===0) throw new Error("El usuario a eliminar no existe");
            res.status(200).send({success: true, message: "Usuario eliminado satisfactoriamente Agente 47."});
        } catch (error) {
            res.status(400).send({success: false, message: error.message});
        }
    };

    login = async (req, res) =>{
        try {
            const {mail, password} = req.body;
            const user = await User.findOne({where:{ mail }});
            if(!user) throw new Error("Datos incorrectos");

            const isPasswordValid = await user.validatePassword(password);
            console.log("Password valid:", isPasswordValid);
            if (!isPasswordValid) throw new Error("Datos incorrectos");

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
            const {user} = req
            let fullUser = await User.findOne({
                where: {
                 id: user.payload.id,
                },
                 attributes:["userName", "mail"],
                 include:[
                     {
                         model: Stat,
                         as: 'stat',
                         attributes:["recordNormal", "recordTimer", "totalGuesses"],
                     },
                 ],
             });
            res.status(200).send({success: true, message: fullUser});
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
                        as: 'stat',
                        attributes: ["recordNormal"],
                    }
                ],
                order: [[{ model: Stat, as: 'stat' }, 'recordNormal', 'DESC']],
                limit: 5
            });

            res.status(200).send({ success: true, message: data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };


    getLeaderboardUsersTimer = async (req, res) => {
        try {
            const data = await User.findAll({
                attributes: ["userName"],
                include: [
                    {
                        model: Stat,
                        as: 'stat',
                        attributes: ["recordTimer"],
                    }
                ],
                order: [[{ model: Stat, as: 'stat' }, 'recordTimer', 'DESC']],
                limit: 5
            });

            res.status(200).send({ success: true, message: data });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };

}



export default UserControllers;