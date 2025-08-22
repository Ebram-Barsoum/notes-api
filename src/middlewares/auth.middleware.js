import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}