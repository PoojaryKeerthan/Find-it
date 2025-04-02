import jwt from "jsonwebtoken";
import createError from "../utils/appError";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return next(new createError("Not authorized, please log in", 401));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new createError("Invalid or expired token", 403));
        }
        req.user = decoded; 
        next();
    });
};

export default verifyToken;
