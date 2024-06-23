import { validateToken } from "../utils/tokens.js";


export const validateLogin = (req, res, next)=>{
    try {
        const {token} =req.cookies;
        if(!token)throw new Error("Denegado");
        const {payload} = validateToken(token);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send({success:false, message:error.message});
    }
};