import { prismaClient } from "../application/database";
import { User } from "@prisma/client";
import { ResponseError } from "../errors/response.error";
import {
    CreateUserRequest,
    LoginUserRequest,
    toUserResponse,
    UpdateUserRequest,
    UserResponse,
} from "../models/user.model";

import { Validation } from "../validations/index";
import { UserValidation } from "../validations/user.validation";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username,
            },
        });

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exists");
        }

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        );

        const user = await prismaClient.user.create({
            data: registerRequest,
        });

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username,
            },
        });

        if (!user) {
            throw new ResponseError(400, "Username or password is wrong");
        }

        const isPasswordValid = await bcrypt.compareSync(
            loginRequest.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new ResponseError(400, "Username or password is wrong");
        }

        const jwtOptions: SignOptions = {
            expiresIn: `${process.env.JWT_EXPIRES_IN}`,
        };

        const tokenJWT = jwt.sign(
            {
                username: user.username,
                name: user.name,
            },
            process.env.JWT_SECRET!,
            jwtOptions
        );

        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username,
            },
            data: {
                token: tokenJWT,
            },
        });

        const response = toUserResponse(user);
        response.token = user.token!;

        return response;
    }

    static async getCurrentUser(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async updateUser(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if(updateRequest.name) {
            user.name = updateRequest.name
        }

        if(updateRequest.password){
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username : user.username
            },
            data: user
        })

        return toUserResponse(result)
    }

    static async logout(user: User) : Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data : {
                token: null
            }
        })

        return toUserResponse(result)
    }
}
