import { NextFunction, Request, Response } from "express";
import { CreateContactRequest } from "../models/contact.model";
import { ContactService } from "../services/contact.service";
import { UserRequest } from "../types/user.request";

export class ContactController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest =
                req.body as CreateContactRequest;
            const response = await ContactService.create(req.user!, request);
            res.status(201).json({
                message: "Create Contact Success",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await ContactService.get(req.user!,contactId);
            res.status(200).json({
                message: "Success to Get Contact Data",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
}
