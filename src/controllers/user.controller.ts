import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest
            const response = await UserService.register(request)
            res.status(200).json({
                message: "Register Success",
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }
}