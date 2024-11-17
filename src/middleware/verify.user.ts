import { NextFunction, Request, Response } from "express";
import { CommonResponse } from "../schema/common-response";
import { verifyJWT } from "../security/secure";

import { User } from "../schema/user.schema";

declare global {
    namespace Express {
        interface Request {
            user?: User; 
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        const response: CommonResponse = {
            statusCode: 401,
            error: "Unauthorized",
            message: "Unauthorized",
        };
        res.status(401).send(response);
        return;
    }
    verifyJWT(token).then((user) => {
        req.user = user;
        next();
    }).catch((error) => {
        const response: CommonResponse = {
            statusCode: 500,
            error: error.message ?? "Internal Server Error",
            message: error.message,
        };
        res.status(500).send(response);
    });
};
