import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { UserRequest } from "../types/user.request";

interface JWTPayload {
    username: string;
    name: string;
}

export const authMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        res.status(401)
            .json({
                message: "Unauthorized",
            })
            .end();
            return
    }

    const token = bearerToken?.split("Bearer ")[1]?.trim();

    if (!token) {
        res.status(401)
            .json({
                message: "Invalid token format",
            })
            .end();
            return
    }

    const payload = jwt.verify(token!, process.env.JWT_SECRET!) as JWTPayload;

    const User = await prismaClient.user.findFirst({
        where: {
            username: payload.username,
        },
    });

    if (!User) {
        res.status(404)
            .json({
                message: "User not found",
            })
            .end();
            return
    }

    req.user = User!;
    next();
    return;
};
