import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../models/user.model";
import { UserService } from "../services/user.service";
import { UserRequest } from "../types/user.request";

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

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response = await UserService.login(request)
            res.status(200).json({
                message: "Login Success",
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }
    static async getCurrentUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getCurrentUser(req.user!)
            res.status(200).json({
                message: "Success to get user data",
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }
    
    static async UpdateUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response = await UserService.updateUser(req.user!, request)
            res.status(200).json({
                message: "Update User Success",
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction){
        try {
            const response = await UserService.logout(req.user!)
            res.status(200).json({
                message: "Logout Success",
            })
            
        } catch (error) {
            next(error)
        }
    }
}