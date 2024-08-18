import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const authMiddleware = (req, res, next) => {
    const headerToken = req.headers.authorization;
    // console.log(headerToken);

    if (!headerToken || !headerToken.startsWith("Bearer ")) {
        res.status(403).json({
            message : "You do not have access to this page"
        })
    }

    const token = headerToken.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: error.message })
    }
}