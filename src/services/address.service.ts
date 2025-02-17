import { User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, toAddressResponse } from "../models/address.model";
import { Validation } from "../validations";
import { AddressValidation } from "../validations/address.validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact.service";

export class AddressService {
    
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request)

        await ContactService.checkContactMustExists(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }
}