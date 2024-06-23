import { validateToken } from "../utils/tokens.js";


export const validateLogin = (req, res, next)=>{
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Denegado");
        const payload = validateToken(token);
        console.log("Token payload:", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.error("Error in validateLogin middleware:", error);
        res.status(401).send({ success: false, message: error.message });
    }
};