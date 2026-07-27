import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next){
    try {

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured.");
    }

        
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token or expired token."
        });
    }
}

/*
local storage logic
const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format."
            });
        }
        const token = authHeader.split(" ")[1];
*/