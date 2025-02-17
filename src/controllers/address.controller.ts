import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user.request";
import { CreateAddressRequest, GetAddressRequest, UpdateAddressRequest } from "../models/address.model";
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

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: GetAddressRequest = {
                id : Number(req.params.addressId),
                contact_id : Number(req.params.contactId),
            };
            const response = await AddressService.get(req.user!, request)
            res.status(200).json({
                message: "Success to Get Address",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateAddressRequest = req.body as UpdateAddressRequest
            request.id = Number(req.params.addressId)
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.update(req.user!, request)
            res.status(200).json({
                message: "Update Address Success",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}