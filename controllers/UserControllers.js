import {User} from "../Models/index.js";


class UserControllers{

    createUser = async (req, res) =>{
        try {
            const{userName, password, mail}=req.body;
            const data = await User.create({userName, password, mail});
            res.status(200).send({success: true, message: data});
        } catch (error) {
            res.status(400).send({success: false, message: error});
        }
    };


    getAllUsers = async (req, res) =>{
        try {
            const [data] = await User.findAll({
                attributes:["userName"],
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

}

export default UserControllers;