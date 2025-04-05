import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            req.user = null;
        } else {
            req.user = decoded;
        }
        next();
    });
};

export default verifyToken;

