import { NextFunction, Request, Response } from "express";
import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "../models/contact.model";
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

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateContactRequest = req.body as UpdateContactRequest
            request.id = Number(req.params.contactId)
            const response = await ContactService.update(req.user!, request);
            res.status(200).json({
                message: "Update Contact Success",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await ContactService.remove(req.user!,contactId);
            res.status(200).json({
                message: "Success to Remove Contact Data",
            })
        } catch (error) {
            next(error);
        }
    }

    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request : SearchContactRequest = {
                name: req.query.name as string,
                email: req.query.email as string,
                phone: req.query.phone as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 5,
            }

            const response = await ContactService.search(req.user!, request);
            res.status(200).json({
                message: "Success to Remove Contact Data",
                data: response.data,
                paging : response.paging
            })
        } catch (error) {
            next(error);
        }
    }

}
