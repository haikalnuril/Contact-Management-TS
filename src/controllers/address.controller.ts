import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user.request";
import { CreateAddressRequest } from "../models/address.model";
import { AddressService } from "../services/address.service";

export class AddressController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId)
            const response = await AddressService.create(req.user!, request)
            res.status(201).json({
                message: "Create Address Success",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}