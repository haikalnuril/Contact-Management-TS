import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse, UpdateAddressRequest } from "../models/address.model";
import { Validation } from "../validations";
import { AddressValidation } from "../validations/address.validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact.service";
import { ResponseError } from "../errors/response.error";
import { logger } from "../application/logging";

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
        const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.id)
        
        return toAddressResponse(address)
    }

    static async update(user: User, request: UpdateAddressRequest) : Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request)
        await ContactService.checkContactMustExists(user.username, updateRequest.contact_id)
        await this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id)

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return toAddressResponse(address)
    }

    static async remove(user: User, request: GetAddressRequest) : Promise<AddressResponse> {
        await ContactService.checkContactMustExists(user.username, request.contact_id)
        await this.checkAddressMustExists(request.contact_id, request.id)
        const address = await prismaClient.address.delete({
            where: {
                id: request.id,
                contact_id: request.contact_id
            }
        })

        return toAddressResponse(address)
    }

    static async list(user: User, contactId: number) : Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExists(user.username, contactId)

        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        })

        return addresses.map((address) => toAddressResponse(address))
    }
}