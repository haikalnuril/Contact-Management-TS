import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse } from "../models/address.model";
import { Validation } from "../validations";
import { AddressValidation } from "../validations/address.validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact.service";
import { ResponseError } from "../errors/response.error";

export class AddressService {

    static async checkAddressMustExists(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        })

        if (!address) {
            throw new ResponseError(404, `Address with ID ${addressId} does not exist for contact id ${contactId}`)
        }

        return address
    }
    
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request)

        await ContactService.checkContactMustExists(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest
        })

        return toAddressResponse(address)
    }

    static async get(user: User, request: GetAddressRequest) : Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExists(user.username, getRequest.contact_id)
        const contact = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id)
        
        return toAddressResponse(contact)
    }
}