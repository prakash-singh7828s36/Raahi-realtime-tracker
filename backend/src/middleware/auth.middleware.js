import jwt from "jsonwebtoken";
import config from "../config/config.js";


export function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            massage: "Unauthorized access"
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            massage: "Unauthorized access please login again"
        })
    }
}

